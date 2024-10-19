use ecommercefullstack;

-- initial

SET SQL_SAFE_UPDATES = 0;
ALTER TABLE jhi_order AUTO_INCREMENT = 1;

DELETE FROM jhi_order;

DELETE FROM jhi_user_authority WHERE `user_id` = '19ac3542-9e52-477d-9b0e-7e226c405d16';
DELETE FROM jhi_user WHERE `id` = '19ac3542-9e52-477d-9b0e-7e226c405d16';


-- hard delete setting

ALTER TABLE order_item
DROP FOREIGN KEY fk_order_item__order_id;

ALTER TABLE order_item
ADD CONSTRAINT fk_order_item__order_id__hard_delete
FOREIGN KEY (order_id)
REFERENCES jhi_order (id)
ON DELETE CASCADE;


-- Query
select * from jhi_user_authority;
select * from jhi_user;
select * from order_item;
select * from jhi_order;
select * from payment;
select * from product;



-- set amount auto calculated
UPDATE order_item oi 
SET    amount = (SELECT p.price * oi.quantity
              FROM product p 
              WHERE p.id = oi.product_id)