import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ValidatedField, ValidatedForm, isNumber, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getProducts } from 'app/entities/product/product.reducer';
import { getEntities as getOrders } from 'app/entities/order/order.reducer';
import { createEntity, getEntity, reset, updateEntity } from './order-item.reducer';

export const OrderItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const products = useAppSelector(state => state.product.entities);
  const orders = useAppSelector(state => state.order.entities);
  const orderItemEntity = useAppSelector(state => state.orderItem.entity);
  const loading = useAppSelector(state => state.orderItem.loading);
  const updating = useAppSelector(state => state.orderItem.updating);
  const updateSuccess = useAppSelector(state => state.orderItem.updateSuccess);

  // Local state for quantity and price
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);

  const handleClose = () => {
    navigate(`/order-item${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProducts({}));
    dispatch(getOrders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);
  useEffect(() => {
    setAmount(quantity * selectedProductPrice);
  }, [quantity, selectedProductPrice]); // Update amount whenever quantity or product price changes
  //
  //   Update amount whenever quantity or product price changes
  //     useEffect(() => {
  //       setAmount(quantity * selectedProductPrice);
  //     }, [quantity, selectedProductPrice]); // Update amount whenever quantity or product price changes

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.quantity !== undefined && typeof values.quantity !== 'number') {
      values.quantity = Number(values.quantity);
    }
    if (values.amount !== undefined && typeof values.amount !== 'number') {
      values.amount = Number(values.amount);
    }
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    const entity = {
      ...orderItemEntity,
      ...values,
      product: products.find(it => it.id.toString() === values.product?.toString()),
      order: orders.find(it => it.id.toString() === values.order?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const handleProductChange = event => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(product => product.id.toString() === selectedProductId);
    setSelectedProductPrice(selectedProduct ? selectedProduct.price : 0); // Update the selected product price
    setQuantity(0); // Reset quantity when product changes
  };

  const defaultValues = () =>
    isNew
      ? {
          createdDate: displayDefaultDateTime(),
          lastModifiedDate: displayDefaultDateTime(),
        }
      : {
          ...orderItemEntity,
          createdDate: convertDateTimeFromServer(orderItemEntity.createdDate),
          lastModifiedDate: convertDateTimeFromServer(orderItemEntity.lastModifiedDate),
          product: orderItemEntity?.product?.id,
          order: orderItemEntity?.order?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ecommercefullstackApp.orderItem.home.createOrEditLabel" data-cy="OrderItemCreateUpdateHeading">
            <Translate contentKey="ecommercefullstackApp.orderItem.home.createOrEditLabel">Create or edit a OrderItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="order-item-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="order-item-order"
                name="order"
                data-cy="order"
                label={translate('ecommercefullstackApp.orderItem.order')}
                type="select"
              >
                <option value="" key="0" />
                {orders
                  ? orders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="order-item-product"
                name="product"
                data-cy="product"
                label={translate('ecommercefullstackApp.orderItem.product')}
                type="select"
                onChange={handleProductChange} // Handle product change
              >
                <option value="" key="0" />
                {products
                  ? products.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.productName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('ecommercefullstackApp.orderItem.quantity')}
                id="order-item-quantity"
                name="quantity"
                data-cy="quantity"
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => (isNumber(v) && v > 0) || translate('entity.validation.greaterThanZero'),
                }}
              />
              <ValidatedField
                label={translate('ecommercefullstackApp.orderItem.amount')}
                id="order-item-amount"
                name="amount"
                data-cy="amount"
                type="text"
                readOnly
                value={amount}
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('ecommercefullstackApp.orderItem.createdDate')}
                id="order-item-createdDate"
                name="createdDate"
                data-cy="createdDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('ecommercefullstackApp.orderItem.lastModifiedDate')}
                id="order-item-lastModifiedDate"
                name="lastModifiedDate"
                data-cy="lastModifiedDate"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderItemUpdate;
