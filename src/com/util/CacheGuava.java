package com.util;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.concurrent.TimeUnit;

public class CacheGuava<K, V> {

    public Cache<K, V> createCache(Long size, Long duration){
        CacheBuilder builder = CacheBuilder.newBuilder();
        if(size != null){
            builder.maximumSize(size.longValue());
        }
        if(duration != null){
            builder.expireAfterWrite(duration.longValue(), TimeUnit.MINUTES);
        }
        Cache<K, V> cache = builder.build();
        return cache;
    }
}
