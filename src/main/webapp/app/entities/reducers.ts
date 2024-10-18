import order from 'app/entities/order/order.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
import product from 'app/entities/product/product.reducer';
import payment from 'app/entities/payment/payment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  order,
  orderItem,
  product,
  payment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
