export const enum OrderStatus {
  NEW = 1,
  REJECTED = 2,
  PREPARING = 3,
  READY_FOR_PICKUP = 4,
  OUT_FOR_DELIVERY = 5,
  DELIVERED = 6,
  CANCELLED = 7,
  FAILED = 8,
}

export const enum TRANSACTION_NATURE {
  INCOME = 1,
  EXPENSE = 2,
}

export const enum PAYMENT_NATURE {
  CASH = 1,
  BANK_TRANSFER = 2,
  CARD = 3,
  UPI = 4,
}
