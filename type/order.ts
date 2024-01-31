import { itemType } from "@/type/product";

export type PaymentType = "CASH_ON_DELIVERY" | "BANK_TRANSFER";
export type DeliveryType = "STORE_PICKUP" | "YANGON" | "OTHERS";

export type Order = {
  orderNumber?: string;
  customerId: string;
  shippingAddress: string;
  township?: null | string;
  city?: null | string;
  state?: null | string;
  zipCode?: null | string;
  orderDate?: string;
  paymentType: PaymentType;
  deliveryType: DeliveryType;
  totalPrice: number;
  deliveryDate: any;
  products: {
    id: string,
    quantity?: number,
  }[];
  sendEmail: boolean;
};