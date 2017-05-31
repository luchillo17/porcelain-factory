import { MyReducer } from 'redux';
import { omit } from 'lodash';

import {
  SET_ORDER,
  DELETE_ORDER ,
  SET_ORDER_ITEM,
  DELETE_ORDER_ITEM,
} from '../actions';

const ordersInitialState: Orders = {
  0: {
    id: '0',
    customer: 'Carlos Lopez',
    address: 'Calle 10 # 6-63'
  },
  1: {
    id: '1',
    customer: 'Luchillo',
    address: 'Medellin El Dorado',
  },
};

export const OrdersReducer: MyReducer<Orders> =
  (state = ordersInitialState, action) => {
    switch (action.type) {
      case SET_ORDER:
        const order = action.payload;
        return { ...state, [order.id]: order };

      case DELETE_ORDER:
        return omit<Orders, Orders>(state, action.payload);

      default:
        return state;
    }
  };

const orderItemsInitialState: OrderItems = {
  0: {
    id: '0',
    orderId: '0',
    productId: '0',
    quantity: 2,
  },
  1: {
    id: '1',
    orderId: '0',
    productId: '1',
    quantity: 3,
  },
  2: {
    id: '2',
    orderId: '1',
    productId: '0',
    quantity: 5,
  },
  3: {
    id: '3',
    orderId: '1',
    productId: '1',
    quantity: 4,
  },
};

export const OrderItemsReducer: MyReducer<OrderItems> =
  (state = orderItemsInitialState, action) => {
    switch (action.type) {
      case SET_ORDER_ITEM:
        const orderItem = action.payload;
        return { ...state, [orderItem.id]: orderItem };

      case DELETE_ORDER_ITEM:
        return omit<OrderItems, OrderItems>(state, action.payload);

      default:
        return state;
    }
  };
