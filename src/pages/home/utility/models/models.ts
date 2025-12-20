import type { IStatus } from "../../../../shared/utility/model/model";

export interface OrderData {
  orders: Order[];
}

export interface Order {
  id: string;
  items: [];
  orderDate: string; // ISO 8601 date string
  status: IStatus;
  total: number;
  userDetails: null;
}
