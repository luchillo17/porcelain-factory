import { createSelector } from 'reselect';
import { filter, map, mapKeys, mapValues, reduce, lowerCase } from 'lodash';

const getProducts = (state: RXState) => state.products;

const getOrders = (state: RXState) => state.orders;
const getOrderItems = (state: RXState) => state.orderItems;
const getSearchTerm = (state: RXState) => lowerCase(state.searchTerm);

export const getOrderItemsByOrder = (order: Order, orderItems: OrderItems) =>
  filter(orderItems, (orderItem) => order.id === orderItem.orderId);

export const filteredOrders = createSelector(
  [getProducts, getOrders, getOrderItems, getSearchTerm],
  (products, orders, orderItems, searchTerm) => {
    orders = mapValues(orders, (order) => {

      const { quantity, total } = reduce(
        getOrderItemsByOrder(order, orderItems),
        (acum, orderItem) => {
          acum.quantity += orderItem.quantity;
          acum.total += orderItem.quantity * products[orderItem.orderId].price;
          return acum;
        },
        { quantity: 0, total: 0 }
      );
      return {
        ...order,
        quantity,
        total,
      };
    });

    if (
      !searchTerm ||
      searchTerm === ''
    ) {
      return orders;
    }

    return mapKeys(
      filter(orders, (order) => (
        lowerCase(order.id).includes(searchTerm) ||
        lowerCase(order.customer).includes(searchTerm) ||
        lowerCase(order.address).includes(searchTerm) ||
        lowerCase(order.address).includes(searchTerm)
      )),
      'id'
    );
  }
);

export const filteredOrderItemsByOrder = (order: Order) => createSelector(
  [getProducts, getOrderItems, getSearchTerm],
  (products, orderItems, searchTerm) => {
    let filteredOrderItems = getOrderItemsByOrder(order, orderItems);
    filteredOrderItems = map(filteredOrderItems, (orderItem) => ({
      ...orderItem,
      product: products[orderItem.productId],
    } as OrderItem));

    if (
      !searchTerm ||
      searchTerm === ''
    ) {
      return mapKeys(filteredOrderItems, 'id');
    }

    filteredOrderItems = filter(filteredOrderItems, (orderItem) =>
      lowerCase(orderItem.id).includes(searchTerm) ||
      lowerCase(orderItem.product && orderItem.product.name).includes(searchTerm)
    );

    return mapKeys(
      filteredOrderItems,
      'id',
    );
  }
);
