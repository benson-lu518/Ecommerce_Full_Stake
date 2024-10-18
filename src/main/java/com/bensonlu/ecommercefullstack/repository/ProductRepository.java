package com.bensonlu.ecommercefullstack.repository;

import com.bensonlu.ecommercefullstack.domain.Product;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN OrderItem oi ON p.id = oi.product.id WHERE oi.id = :orderItemId")
    Product findProductByOrderItemId(@Param("orderItemId") Long orderItemId);
}
