package com.service;

import com.model.Order;
import org.springframework.stereotype.Service;

@Service
public class OrderService extends BaseService<Order> {

    @Override
    public String getClassName() {
        return Order.class.getSimpleName();
    }

}
