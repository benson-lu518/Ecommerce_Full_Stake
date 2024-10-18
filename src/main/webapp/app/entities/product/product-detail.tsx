import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="ecommercefullstackApp.product.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="productName">
              <Translate contentKey="ecommercefullstackApp.product.productName">Product Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.productName}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="ecommercefullstackApp.product.category">Category</Translate>
            </span>
          </dt>
          <dd>{productEntity.category}</dd>
          <dt>
            <span id="imageUrl">
              <Translate contentKey="ecommercefullstackApp.product.imageUrl">Image Url</Translate>
            </span>
          </dt>
          <dd>{productEntity.imageUrl}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="ecommercefullstackApp.product.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="stock">
              <Translate contentKey="ecommercefullstackApp.product.stock">Stock</Translate>
            </span>
          </dt>
          <dd>{productEntity.stock}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ecommercefullstackApp.product.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="createdDate">
              <Translate contentKey="ecommercefullstackApp.product.createdDate">Created Date</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.createdDate ? <TextFormat value={productEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedDate">
              <Translate contentKey="ecommercefullstackApp.product.lastModifiedDate">Last Modified Date</Translate>
            </span>
          </dt>
          <dd>
            {productEntity.lastModifiedDate ? (
              <TextFormat value={productEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
