package com.util;

/**
 * Created by lfssay on 2015/6/2.
 */

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


/**
 * You shouldn't use the same instance from different threads because you'll have strange errors.
 * And sometimes creating lots of Jedis instances is not good enough because it means lots of sockets and connections,
 * which leads to strange errors as well. A single Jedis instance is not threadsafe!
 * To avoid these problems, you should use JedisPool, which is a threadsafe pool of network connections.
 * This way you can overcome those strange errors and achieve great performance.
 * To use it, init a pool:
 *  JedisPool pool = new JedisPool(new JedisPoolConfig(), "localhost");
 *  You can store the pool somewhere statically, it is thread-safe.
 *  JedisPoolConfig includes a number of helpful Redis-specific connection pooling defaults.
 *  For example, Jedis with JedisPoolConfig will close a connection after 300 seconds if it has not been returned.
 * @author wujintao
 */
public class JedisUtil {
    protected static Log log = LogFactory.getLog(JedisUtil.class);
    public static final String JREDIS_IP = "redis.ip";

    public static final String JREDIS_PORT = "redis.port";

    public static final String JREDIS_AUTH = "redis.auth";

    public static PropertiesLoader propertiesLoader = new PropertiesLoader("redis.properties");

    public static Integer port = Integer.parseInt(propertiesLoader.getProperty(JREDIS_PORT));
    public static String ip = propertiesLoader.getProperty(JREDIS_IP);
    public static String auth = propertiesLoader.getProperty(JREDIS_AUTH);

    /**
     * 私有构造器.
     */
    private JedisUtil() {

    }
    private static Map<String,JedisPool> maps  = new HashMap<String,JedisPool>();

    public static Jedis getStaticJedis(){
        return JedisUtil.getJedis(ip, port, auth);
    }

    public static void closeJedis(Jedis jedis){

        JedisUtil.closeJedis(jedis,ip, port, auth);
    }


    /**
     * 获取连接池.
     * @return 连接池实例
     */
    public static JedisPool getPool(String ip, int port,String pwd) {
        String key = ip+":" +port;
        JedisPool pool = null;
        //这里为了提供大多数情况下线程池Map里面已经有对应ip的线程池直接返回，提高效率
        if(maps.containsKey(key)){
            pool = maps.get(key);
            return pool;
        }
        //这里的同步代码块防止多个线程同时产生多个相同的ip线程池
        try {
            GenericObjectPoolConfig config = new GenericObjectPoolConfig();
            config.setMaxTotal(1000);

            //对象最大空闲时间
            config.setMaxIdle(1000 * 60);
            //获取对象时最大等待时间
            config.setMaxWaitMillis(1000 * 10);
            config.setTestOnBorrow(true);
            config.setTestOnReturn(true);
            /**
             *如果你遇到 java.net.SocketTimeoutException: Read timed out exception的异常信息
             *请尝试在构造JedisPool的时候设置自己的超时值. JedisPool默认的超时时间是2秒(单位毫秒)
             */
            pool = new JedisPool(config, ip, port, 2000,pwd);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return pool;
    }

    /**
     * 获取Redis实例.
     * @return Redis工具类实例
     */
    public static Jedis getJedis(String ip,int port,String pwd) {
        Jedis jedis  = null;

        synchronized(JedisUtil.class) {
            try {
                jedis = getPool(ip, port, pwd).getResource();
                //log.info("get redis master1!");
            } catch (Exception e) {
                log.error("get redis master1 failed!", e);
                // 销毁对象
                getPool(ip, port, pwd).returnBrokenResource(jedis);
                return null;
            }
        }

        return jedis;
    }
    
    /**
     * 获取Redis实例.
     * @return Redis工具类实例
     */
    public static Jedis getNewJedis() {
    	Jedis jedis = new Jedis(ip, port);
    	jedis.auth(auth);
        return jedis;
    }

    /**
     * 释放redis实例到连接池.
     * @param jedis redis实例
     */
    public static void closeJedis(Jedis jedis,String ip,int port,String pwd) {
//        if(jedis != null) {
//            getPool(ip,port,pwd).returnResource(jedis);
//        }
        try {
            jedis.close();
        }catch (Exception e){
            e.printStackTrace();
        }

    }


    public static void main(String[] args) {
        Executor executor = Executors.newFixedThreadPool(10);
        for(int i=0;i<20;i++) {
            Jedis jedis = new JedisUtil().getStaticJedis();
            jedis.set("a_test_"+":"+100,1+"");
            jedis.expire("a_test_"+":"+100,2000);
        }
    }

    class At implements Runnable{
        private Integer a = 100;

        public At(Integer param){
            a = param;
        }

        @Override
        public void run() {
            Jedis jedis = new JedisUtil().getStaticJedis();
            jedis.set("a_test_"+a+":"+1,1+"");
            jedis.expire("a_test_"+a+":"+1,2000);
            for(int i=0;i<100;i++) {

            }

//            for(int i=0;i<10000;i++) {
//                Jedis jedis = new JedisUtil().getStaticJedis();
//                System.out.println(a+"-"+jedis.toString());
//                jedis.set("a_test_"+a+":"+i,i+"");
//                System.out.println("current:"+a);
//                jedis.expire("a_test_"+a+":"+i,1000);
//                closeJedis(jedis);
//            }
        }
    }
}