package com.util;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Created by lfssay on 2016/4/28.
 */
public class GuaCacheUtil {

    private static Cache<String, List> cache = CacheBuilder.newBuilder()
            .concurrencyLevel(50)
            .initialCapacity(30)
            .maximumSize(10000)
            .expireAfterAccess(10L, TimeUnit.MINUTES)
            .build();


    public static Cache getCache(){
        return cache;
    }

    private static Cache<String, List> cacheAdmin = CacheBuilder.newBuilder()
            .concurrencyLevel(50)
            .initialCapacity(30)
            .maximumSize(10000)
            .expireAfterAccess(10L, TimeUnit.MINUTES)
            .build();

    private static Cache<String, Integer> cacheAdminNum = CacheBuilder.newBuilder()
            .concurrencyLevel(50)
            .initialCapacity(30)
            .maximumSize(10000)
            .expireAfterAccess(10L, TimeUnit.MINUTES)
            .build();


    public static Cache getAdminCache(){
        return cache;
    }
    public static Cache getAdminNumCache(){
        return cacheAdminNum;
    }
}
