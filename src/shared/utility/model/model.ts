export interface IBook {
  id: number;
  title: string;
  totalAmount: number;
  description: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface IBookReq {
  title: string;
  description?: string | null;
}

export interface IExpenseReq {
  amount: number;
  date: string;
  categoryId: number;
  paymentTypeId: number;
  transactionTypeId: number;
  notes: string | null;
}

export interface IReq<P, B> {
  params: P;
  reqBody: B;
}

export interface IOption {
  id: number;
  name: string;
}

export interface IExpenseCategory extends IOption {
  colorCode: string;
}

export interface ICategory extends IOption {
  isDefault: boolean;
  colorCode: string;
}

export interface ISummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  totalEntries: number;
}

export interface IExpenseItem {
  id: number;
  amount: number;
  date: string;
  notes: string | null;
  category: IExpenseCategory;
  paymentType: IOption;
  transactionType: IOption;
}

export interface IExpense extends IExpenseItem {
  book: IOption;
}

export interface IExpenseRes {
  book: IOption;
  summary: ISummary;
  expenses: IExpenseItem[];
}

// No Use
export interface IRestaurants {
  id: string;
  name: string;
  description: string | null;
  address: IAddress;
  categories: string[];
  images: string[] | null;
  isVeg: boolean;
  isOpen: boolean;
}

export interface IAddress {
  id: number;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pincode: number;
}

export interface IPriceBreakDown {
  title: string;
  value: number;
  fz: string;
  color: string;
  fw: string;
}

export interface IStatus {
  id: number;
  status: string;
}

export interface IUserDetails {
  id: string;
  name: string;
  address: string;
}

export interface IOrderItems {
  id: number;
  title: string;
  price: number;
  quantity: number;
  variant: string | null;
}

// export interface ICategoryRes {
//   categories: ICategory[];
// }

// export interface ICategory {
//   id: number;
//   image: string;
//   name: string;
//   description: string | null;
// }

export interface IDropDown {
  label: string;
  value: string;
}
