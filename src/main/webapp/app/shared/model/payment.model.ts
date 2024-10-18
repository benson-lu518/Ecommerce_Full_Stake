import dayjs from 'dayjs';

export interface IPayment {
  id?: number;
  paymentState?: string;
  paymentMethod?: string;
  paymentDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IPayment> = {};
