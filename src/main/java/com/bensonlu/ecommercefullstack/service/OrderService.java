package com.bensonlu.ecommercefullstack.service;

import com.bensonlu.ecommercefullstack.domain.OrderItem;
import com.bensonlu.ecommercefullstack.domain.Product;
import com.bensonlu.ecommercefullstack.repository.OrderItemRepository;
import com.bensonlu.ecommercefullstack.repository.OrderRepository;
import com.bensonlu.ecommercefullstack.repository.ProductRepository;
import com.bensonlu.ecommercefullstack.web.rest.OrderItemResource;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderService {

    private final OrderItemRepository orderItemRepository;

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;
    private static final Logger LOG = LoggerFactory.getLogger(OrderItemResource.class);

    public OrderService(OrderItemRepository orderItemRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public void deleteOrder(long id) {
        // get order item list by order id
        Set<OrderItem> orderItemSet = orderItemRepository.findAllByOrderId(id);

        // update product stock
        for (OrderItem orderItem : orderItemSet) {
            // get product
            Product product = productRepository.findProductByOrderItemId(orderItem.getId());

            // update product stock
            // add the stock and save
            Integer requiredQuantity = orderItem.getQuantity();
            product.setStock(product.getStock() + requiredQuantity);

            productRepository.save(product);
        }

        // delete order
        orderRepository.deleteById(id);
    }
}
