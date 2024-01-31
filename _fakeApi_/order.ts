import type { Order } from '@/type/order';
import {createUuid} from '@/_fakeApi_/helper'
const orders: Order[] = [
];
class OrderApi {
    createOrder(order: Order): Promise<Order> {
        order.orderNumber = createUuid();
        order.orderDate = new Date().toISOString();
        orders.push(order);
        return Promise.resolve(order);
    }
}

export const orderApi = new OrderApi();