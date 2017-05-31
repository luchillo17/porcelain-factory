import { createSelector } from 'reselect';
import { filter, mapKeys, mapValues, reduce, lowerCase } from 'lodash';

const getProducts = (state: RXState) => state.products;
const getInventories = (state: RXState) => state.inventories;
const getOrderItems = (state: RXState) => state.orderItems;
const getSearchTerm = (state: RXState) => lowerCase(state.searchTerm);

export const filteredInventories = createSelector(
  [getProducts, getInventories, getOrderItems, getSearchTerm],
  (products, inventories, orderItems, searchTerm) => {
    inventories = mapValues(inventories, (inventory) => ({
      ...inventory,
      product: products[inventory.productId],
      reserved: reduce(
        orderItems,
        (sum, orderItem) => {
          const quantity = orderItem.productId === inventory.productId ?
            orderItem.quantity : 0;
          return sum + quantity;
        },
        0,
      ),
    }));

    if (
      !searchTerm ||
      searchTerm === ''
    ) {
      return inventories;
    }

    return mapKeys(
      filter(inventories, (inventory) => (
        lowerCase(inventory.id).includes(searchTerm) ||
        lowerCase(inventory.product && inventory.product.name).includes(searchTerm)
      )),
      'id'
    );
  }
);
