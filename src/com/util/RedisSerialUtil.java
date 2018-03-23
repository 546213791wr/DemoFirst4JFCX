package com.util;

import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created with IntelliJ IDEA.
 * User: leolin
 * Date: 2017/6/14_10:12
 * version:
 * description:  redis 序列化和反序列化
 */
public class RedisSerialUtil{

    public static <T> ListOperations<String, T> setCacheList(String key, List<T> dataList,Integer minute,RedisTemplate redisTemplate)
    {
        ListOperations listOperation = redisTemplate.opsForList();
        if(null != dataList)
        {
            int size = dataList.size();
            for(int i = 0; i < size ; i ++)
            {
                listOperation.rightPush(key,redisTemplate.getValueSerializer().serialize(dataList.get(i)));
            }
        }

        // 设置缓存时效性。
        redisTemplate.expire(key,minute * 60,TimeUnit.SECONDS);

//        BoundListOperations boundListOperations = redisTemplate.boundListOps(key);
//        boundListOperations.expire(minute, TimeUnit.MINUTES);
        return listOperation;
    }

    /**
     * 获得缓存的list对象
     * @param key    缓存的键值
     * @return        缓存键值对应的数据
     */
    public static <T> List<T> getCacheListRM(RedisTemplate redisTemplate,String key)
    {
        List<T> dataList = new ArrayList<T>();
        ListOperations<String,byte[]> listOperation = redisTemplate.opsForList();

        Long size = listOperation.size(key);
        List<byte[]> listDatas = listOperation.range(key,0,-1);

        for(int i = 0 ; i < size ; i ++)
        {
            byte[] obj = listDatas.get(i);

            dataList.add((T) redisTemplate.getValueSerializer().deserialize(obj));
        }
        return dataList;
    }

    /**
     * 从redis里面获取数据和放置数据，minute代表时间
     * @param redisTemplate
     * @param key
     * @param callable  里面需要放置数据拉取的方法。
     * @param <T>
     * @return
     */
    public static <T> List<T> getAndPut(RedisTemplate redisTemplate,String key,java.util.concurrent.Callable callable){
        // 默认缓存10分钟。
        Integer minute = Constants.REDIS_CACHE_TIME;
        // 获取缓存
        List<T> dataList = getCacheListRM(redisTemplate,key);

        // 如果缓存为空，则加入缓存数据
        if(dataList.size() == 0){
            try {
               dataList = (List<T>) callable.call();
                // 这个位置 可以允许redis重复写一个key。
                if(dataList.size() > 0) {
                    setCacheList(key, dataList, minute, redisTemplate);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return dataList;
    }
}
