import dayjs from 'dayjs';
import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IOrderItem {
  id?: number;
  quantity?: number;
  amount?: number;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  product?: IProduct | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
