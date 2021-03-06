package com.util;
import net.sf.ehcache.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.support.SimpleValueWrapper;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.StringUtils;

import java.io.*;

/**
 *
 */
public class EhRedisCache implements Cache {

    private static final Logger LOG = LoggerFactory
            .getLogger(EhRedisCache.class);

    private String name;

    /*** 一定容量的LRU队列 */
    private net.sf.ehcache.Cache ehCache;

    /*** 无容量限制key带时效性 */
    private RedisTemplate<String, Object> redisTemplate;

    private long liveTime = Constants.REDIS_CACHE_TIME * 60; // 默认1h=1*60*60

    /** 命中次数 */
    private int activeCount = 2;

    @Override
    public String getName() {
        return this.name;
    }

    @Override
    public Object getNativeCache() {
        return this;
    }

    /**
     * 获取自定义缓存
     */
    @Override
    public ValueWrapper get(Object key) {
        Element value = ehCache.get(key);
        LOG.debug("Cache L1 (ehcache) :{"+name+"}{"+key+"}={"+value+"}");
        if (value != null) {
          if (value.getHitCount() < activeCount) {
            return (value != null ? new SimpleValueWrapper(value.getObjectValue()) : null);
          } else {
              LOG.debug("Cache continue hit : (ehcache) :{"+name+"}{"+key+"}={"+value+"}");
              value.resetAccessStatistics();
          }
        }
        final String keyStr = name+":"+key.toString();
        Object objectValue = redisTemplate.execute(new RedisCallback<Object>() {
            public Object doInRedis(RedisConnection connection)
                    throws DataAccessException {
                byte[] key = keyStr.getBytes();
                byte[] value = connection.get(key);
                if (value == null) {
                    return null;
                }
                // 每次获得延迟时间
                if (liveTime > 0) {
                    connection.expire(key, liveTime);
                }
                return toObject(value);
            }
        }, true);
        ehCache.put(new Element(key, objectValue));// 取出来之后缓存到本地
        LOG.debug("Cache L2 (redis) :{"+name+"}{"+key+"}={"+objectValue+"}");
        return (objectValue != null ? new SimpleValueWrapper(objectValue) : null);

    }

    /**
     * 更新自定义缓存
     */
    @Override
    public void put(Object key, Object value) {
        ehCache.put(new Element(key, value));
        final String keyStr = name+":"+key.toString();
        final Object valueStr = value;
        redisTemplate.execute(new RedisCallback<Long>() {
            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                byte[] keyb = keyStr.getBytes();
                byte[] valueb = toByteArray(valueStr);
                connection.set(keyb, valueb);
                if (liveTime > 0) {
                    connection.expire(keyb, liveTime);
                }
                return 1L;
            }
        }, true);

        LOG.debug("Cache L3 (input redis) :{"+name+"}{"+key+"}={"+value+"}");

    }

    /**
     * 删除指定key缓存
     */
    @Override
    public void evict(Object key) {
        ehCache.remove(key);
        final String keyStr = name + ":" + key.toString();
        LOG.error("开始清除redis数据2");
        redisTemplate.execute(new RedisCallback<Long>() {

            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                LOG.error("开始清除redis数据3 ："+keyStr);
                return connection.del(keyStr.getBytes());
            }
        }, true);
    }

    /**
     * 清除缓存
     */
    @Override
    public void clear() {
        ehCache.removeAll();
        redisTemplate.execute(new RedisCallback<String>() {
            public String doInRedis(RedisConnection connection)
                    throws DataAccessException {
                connection.flushDb();
                return "clear done.";
            }
        }, true);
    }


    public net.sf.ehcache.Cache getEhCache() {
        return ehCache;
    }

    public void setEhCache(net.sf.ehcache.Cache ehCache) {
        this.ehCache = ehCache;
    }

    public RedisTemplate<String, Object> getRedisTemplate() {
        return redisTemplate;
    }

    public void setRedisTemplate(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public long getLiveTime() {
        return liveTime;
    }

    public void setLiveTime(long liveTime) {
        this.liveTime = liveTime;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getActiveCount() {
        return activeCount;
    }

    public void setActiveCount(int activeCount) {
        this.activeCount = activeCount;
    }

    private byte[] toByteArray(Object obj) {
        byte[] bytes = null;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            ObjectOutputStream oos = new ObjectOutputStream(bos);
            oos.writeObject(obj);
            oos.flush();
            bytes = bos.toByteArray();
            oos.close();
            bos.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return bytes;
    }

    private Object toObject(byte[] bytes) {
        Object obj = null;
        try {
            ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
            ObjectInputStream ois = new ObjectInputStream(bis);
            obj = ois.readObject();
            ois.close();
            bis.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        } catch (ClassNotFoundException ex) {
            ex.printStackTrace();
        }
        return obj;
    }

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.cache.Cache#get(java.lang.Object,
     * java.lang.Class)
     */
    @Override
    public <T> T get(Object key, Class<T> type) {
        if (StringUtils.isEmpty(key) || null == type) {
            return null;
        } else {
//          final String finalKey;
            final Class<T> finalType = type;
//          if (key instanceof String) {
//              finalKey = (String) key;
//          } else {
//              finalKey = key.toString();
//          }
//          final Object object = this.get(finalKey);
            final Object object = this.get(key);
            if (finalType != null && finalType.isInstance(object)
                    && null != object) {
                return (T) object;
            } else {
                return null;
            }
        }
    }

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.cache.Cache#putIfAbsent(java.lang.Object,
     * java.lang.Object)
     */
    @Override
    public ValueWrapper putIfAbsent(Object key, Object value) {
//      final String finalKey;
        if (StringUtils.isEmpty(key) || StringUtils.isEmpty(value)) {
            return null;
        } else {
//          if (key instanceof String) {
//              finalKey = (String) key;
//          } else {
//              finalKey = key.toString();
//          }
//          if (!StringUtils.isEmpty(finalKey)) {
//              final Object finalValue = value;
            this.put(key, value);
//          }
        }
        return new SimpleValueWrapper(value);
    }

}