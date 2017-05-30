// State specific
interface RXState {
  products: Products;
  searchTerm: string;
}

// Products
interface Products {
  [key: string]: Product;
}

interface Product {
  id: string;
  name: string;
  type: string;
  price: string;
  considerations: string;
}

// Inventories
interface Inventories {
  [key: string]: Inventory;
}

interface Inventory {
  id: string;
  productId: string;
  quantity: number;
  reserved: number;
}

// Table specific
interface Field {
  label: string;
  key: string
}
