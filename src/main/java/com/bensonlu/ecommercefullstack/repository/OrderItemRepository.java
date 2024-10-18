package com.bensonlu.ecommercefullstack.repository;

import com.bensonlu.ecommercefullstack.domain.OrderItem;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the OrderItem entity.
 */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    default Optional<OrderItem> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<OrderItem> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<OrderItem> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    default Set<OrderItem> findAllByOrderId(Long orderId) {
        return this.findAllByOrder(orderId);
    }

    @Query("select orderItem from OrderItem orderItem where orderItem.order.id = :orderId")
    Set<OrderItem> findAllByOrder(@Param("orderId") Long orderId);

    @Query(
        value = "select orderItem from OrderItem orderItem left join fetch orderItem.product",
        countQuery = "select count(orderItem) from OrderItem orderItem"
    )
    Page<OrderItem> findAllWithToOneRelationships(Pageable pageable);

    @Query("select orderItem from OrderItem orderItem left join fetch orderItem.product")
    List<OrderItem> findAllWithToOneRelationships();

    @Query("select orderItem from OrderItem orderItem left join fetch orderItem.product where orderItem.id =:id")
    Optional<OrderItem> findOneWithToOneRelationships(@Param("id") Long id);
}
