package com.bensonlu.ecommercefullstack.service;

import com.bensonlu.ecommercefullstack.domain.OrderItem;
import com.bensonlu.ecommercefullstack.domain.Product;
import com.bensonlu.ecommercefullstack.repository.OrderItemRepository;
import com.bensonlu.ecommercefullstack.repository.OrderRepository;
import com.bensonlu.ecommercefullstack.repository.ProductRepository;
import com.bensonlu.ecommercefullstack.web.rest.OrderItemResource;
import java.math.BigDecimal;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;
    private static final Logger LOG = LoggerFactory.getLogger(OrderItemResource.class);

    public OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        // Save order item
        orderItem = orderItemRepository.save(orderItem);

        // update order amount
        Long orderId = orderItem.getOrder().getId();
        BigDecimal changeAmount = orderItem.getAmount(); // amount of the order item
        orderRepository.updateOrderTotalAmount(orderId, changeAmount); // add to order total amount

        // update product stock
        // get product id
        Product product = productRepository.findProductByOrderItemId(orderItem.getId());
        Integer requiredQuantity = orderItem.getQuantity();

        // Check if product stock is sufficient
        if (product.getStock() < requiredQuantity) {
            LOG.warn(
                "Insufficient stock for productID {} : required {}, available {}",
                product.getId(),
                requiredQuantity,
                product.getStock()
            );
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for productId: " + product.getId());
        }
        // Deduct the stock and save
        product.setStock(product.getStock() - requiredQuantity);
        productRepository.save(product);

        return orderItem;
    }

    public void deleteOrderItem(long id) {
        // get order item
        Optional<OrderItem> orderItemOptional = orderItemRepository.findById(id);
        OrderItem orderItem = orderItemOptional.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Long orderId = orderItem.getOrder().getId();

        // update order amount
        BigDecimal changeAmount = orderItem.getAmount().negate(); // amount of the order item
        orderRepository.updateOrderTotalAmount(orderId, changeAmount);

        // get product
        Product product = productRepository.findProductByOrderItemId(orderItem.getId());

        // update product stock
        // add the stock and save
        Integer requiredQuantity = orderItem.getQuantity();
        product.setStock(product.getStock() + requiredQuantity);

        // delete order item
        orderItemRepository.deleteById(id);

        productRepository.save(product);
    }
}
