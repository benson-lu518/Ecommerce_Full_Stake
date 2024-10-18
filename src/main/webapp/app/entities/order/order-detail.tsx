import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity as getOrderEntity } from './order.reducer';
import { getEntities as getOrderItemEntities } from 'app/entities/order-item/order-item.reducer';

export const OrderDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getOrderEntity(id));
    dispatch(getOrderItemEntities({})); // This will fetch all order items
  }, []);

  const orderEntity = useAppSelector(state => state.order.entity);
  const orderItemEntities = useAppSelector(state => state.orderItem.entities);

  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderDetailsHeading">
          <Translate contentKey="ecommercefullstackApp.order.detail.title">Order</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderEntity.id}</dd>
          <dt>
            <span id="totalAmount">
              <Translate contentKey="ecommercefullstackApp.order.totalAmount">Total Amount</Translate>
            </span>
          </dt>
          <dd>{orderEntity.totalAmount}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="ecommercefullstackApp.order.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>{orderEntity.createdDate ? <TextFormat value={orderEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="ecommercefullstackApp.order.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {orderEntity.lastModifiedDate ? <TextFormat value={orderEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="ecommercefullstackApp.order.payment">Payment</Translate>
          </dt>
          <dd>{orderEntity.payment ? orderEntity.payment.paymentMethod : ''}</dd>
          <dt>
            <Translate contentKey="ecommercefullstackApp.order.user">User</Translate>
          </dt>
          <dd>{orderEntity.user ? orderEntity.user.login : ''}</dd>
          <dt>
            <Translate contentKey="ecommercefullstackApp.order.orderItem">Order Items</Translate>
          </dt>
          <dd>
            {orderEntity.orderItems && orderEntity.orderItems.length > 0 ? (
              <ul>
                {orderItemEntities
                  .filter(item => item.order.id === orderEntity.id)
                  .map((item, index) => (
                    <li key={index}>
                      <div>
                        <strong>Product Name: </strong> {item.product.productName}
                      </div>
                      <div>
                        <strong>Quantity:</strong> {item.quantity}
                      </div>
                      <div>
                        <strong>Amount:</strong> {item.amount}
                      </div>
                      <div>
                        <strong>Created Date:</strong>
                        {item.createdDate ? <TextFormat value={item.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <span>No order items found.</span>
            )}
          </dd>
        </dl>
        <Button tag={Link} to="/order" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order/${orderEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderDetail;
