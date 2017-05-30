import { createSelector } from 'reselect';
import { filter, mapKeys, mapValues, lowerCase } from 'lodash';

const getProducts = (state: RXState) => state.products;
const getInventories = (state: RXState) => state.inventories;
const getSearchTerm = (state: RXState) => lowerCase(state.searchTerm);

export const filteredInventories = createSelector(
  [getProducts, getInventories, getSearchTerm],
  (products, inventories, searchTerm) => {
    inventories = mapValues(inventories, (inventory) => ({
      ...inventory,
      product: products[inventory.productId],
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
