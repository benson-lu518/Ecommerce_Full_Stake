package com.bensonlu.ecommercefullstack.repository;

import com.bensonlu.ecommercefullstack.domain.Order;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Order entity.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select jhiOrder from Order jhiOrder where jhiOrder.user.login = ?#{authentication.name}")
    List<Order> findByUserIsCurrentUser();

    @Modifying
    @Query("update Order jhiOrder set jhiOrder.totalAmount = jhiOrder.totalAmount + :changeAmount where jhiOrder.id = :orderId")
    void updateOrderTotalAmount(@Param("orderId") Long orderId, @Param("changeAmount") BigDecimal changeAmount);

    default Order findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Order> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Order> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select jhiOrder from Order jhiOrder left join fetch jhiOrder.payment left join fetch jhiOrder.user",
        countQuery = "select count(jhiOrder) from Order jhiOrder"
    )
    Page<Order> findAllWithToOneRelationships(Pageable pageable);

    @Query("select jhiOrder from Order jhiOrder left join fetch jhiOrder.payment left join fetch jhiOrder.user")
    List<Order> findAllWithToOneRelationships();

    @Query("select jhiOrder from Order jhiOrder left join fetch jhiOrder.payment left join fetch jhiOrder.user where jhiOrder.id =:id")
    Order findOneWithToOneRelationships(@Param("id") Long id);
}
