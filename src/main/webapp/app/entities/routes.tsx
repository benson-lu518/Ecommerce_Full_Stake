import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Order from './order';
import OrderItem from './order-item';
import Product from './product';
import Payment from './payment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="order/*" element={<Order />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="product/*" element={<Product />} />
        <Route path="payment/*" element={<Payment />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
