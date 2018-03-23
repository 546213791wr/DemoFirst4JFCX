package com.service;

import com.model.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductService extends BaseService<Product> {

    @Override
    public String getClassName() {
        return Product.class.getSimpleName();
    }

}
