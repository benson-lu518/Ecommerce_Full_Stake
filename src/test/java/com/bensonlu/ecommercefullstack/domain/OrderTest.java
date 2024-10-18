package com.bensonlu.ecommercefullstack.domain;

import static com.bensonlu.ecommercefullstack.domain.OrderItemTestSamples.*;
import static com.bensonlu.ecommercefullstack.domain.OrderTestSamples.*;
import static com.bensonlu.ecommercefullstack.domain.PaymentTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.bensonlu.ecommercefullstack.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class OrderTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Order.class);
        Order order1 = getOrderSample1();
        Order order2 = new Order();
        assertThat(order1).isNotEqualTo(order2);

        order2.setId(order1.getId());
        assertThat(order1).isEqualTo(order2);

        order2 = getOrderSample2();
        assertThat(order1).isNotEqualTo(order2);
    }

    @Test
    void paymentTest() {
        Order order = getOrderRandomSampleGenerator();
        Payment paymentBack = getPaymentRandomSampleGenerator();

        order.setPayment(paymentBack);
        assertThat(order.getPayment()).isEqualTo(paymentBack);

        order.payment(null);
        assertThat(order.getPayment()).isNull();
    }

    @Test
    void orderItemTest() {
        Order order = getOrderRandomSampleGenerator();
        OrderItem orderItemBack = getOrderItemRandomSampleGenerator();

        order.addOrderItem(orderItemBack);
        assertThat(order.getOrderItems()).containsOnly(orderItemBack);
        assertThat(orderItemBack.getOrder()).isEqualTo(order);

        order.removeOrderItem(orderItemBack);
        assertThat(order.getOrderItems()).doesNotContain(orderItemBack);
        assertThat(orderItemBack.getOrder()).isNull();

        order.orderItems(new HashSet<>(Set.of(orderItemBack)));
        assertThat(order.getOrderItems()).containsOnly(orderItemBack);
        assertThat(orderItemBack.getOrder()).isEqualTo(order);

        order.setOrderItems(new HashSet<>());
        assertThat(order.getOrderItems()).doesNotContain(orderItemBack);
        assertThat(orderItemBack.getOrder()).isNull();
    }
}
