package com.bensonlu.ecommercefullstack.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class ProductTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static Product getProductSample1() {
        return new Product()
            .id(1L)
            .productName("productName1")
            .category("category1")
            .imageUrl("imageUrl1")
            .stock(1)
            .description("description1");
    }

    public static Product getProductSample2() {
        return new Product()
            .id(2L)
            .productName("productName2")
            .category("category2")
            .imageUrl("imageUrl2")
            .stock(2)
            .description("description2");
    }

    public static Product getProductRandomSampleGenerator() {
        return new Product()
            .id(longCount.incrementAndGet())
            .productName(UUID.randomUUID().toString())
            .category(UUID.randomUUID().toString())
            .imageUrl(UUID.randomUUID().toString())
            .stock(intCount.incrementAndGet())
            .description(UUID.randomUUID().toString());
    }
}
