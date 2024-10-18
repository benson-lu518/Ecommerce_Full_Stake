import dayjs from 'dayjs';
import { IPayment } from 'app/shared/model/payment.model';
import { IUser } from 'app/shared/model/user.model';

export interface IOrder {
  id?: number;
  totalAmount?: number;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedDate?: dayjs.Dayjs | null;
  payment?: IPayment | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IOrder> = {};
