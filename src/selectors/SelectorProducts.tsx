import { createSelector } from 'reselect';
import { filter, mapKeys, lowerCase } from 'lodash';

const getProducts = (state: RXState) => state.products;
const getSearchTerm = (state: RXState) => lowerCase(state.searchTerm);

export const filteredProducts = createSelector(
  [getProducts, getSearchTerm],
  (products, searchTerm) => {
    if (
      !searchTerm ||
      searchTerm === ''
    ) {
      return products;
    }

    return mapKeys(
      filter(products, (product) => (
        lowerCase(product.id).includes(searchTerm) ||
        lowerCase(product.name).includes(searchTerm) ||
        lowerCase(product.type).includes(searchTerm)
      )),
      'id'
    );
  }
);
