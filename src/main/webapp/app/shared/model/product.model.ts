import dayjs from 'dayjs';

export interface IProduct {
  id?: number;
  productName?: string;
  category?: string;
  imageUrl?: string | null;
  price?: number;
  stock?: number;
  description?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export const defaultValue: Readonly<IProduct> = {};
