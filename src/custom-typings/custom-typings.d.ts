// State specific
interface RXState {
  products: Products;
  inventories: Inventories;
  orders: Orders;
  orderItems: OrderItems;

  searchTerm: string;
}

// Form specific

// Table specific
interface TableField {
  label: string;
  key: string;
}

// Products
interface Products {
  [key: string]: Product;
}

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
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

  product?: Product;
}

// Orders
interface Orders {
  [key: string]: Order;
}

interface OrderItems {
  [key: string]: OrderItem;
}

interface Order {
  id: string;
  customer: string;
  address: string;
  quantity?: number;
  total?: number;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;

  order?: Order;
  product?: Product;
  available?: number;
}
