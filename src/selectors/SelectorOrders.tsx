import { createSelector } from 'reselect';
import { filter, mapKeys, mapValues, reduce, lowerCase } from 'lodash';

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

      let { quantity, total } = reduce(
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
      filter(orders, (inventory) => (
        lowerCase(inventory.id).includes(searchTerm) ||
        lowerCase(inventory.customer).includes(searchTerm) ||
        lowerCase(inventory.address).includes(searchTerm) ||
        lowerCase(inventory.address).includes(searchTerm)
      )),
      'id'
    );
  }
);
