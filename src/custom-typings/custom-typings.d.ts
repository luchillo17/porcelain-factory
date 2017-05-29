// State specific
interface RXState {
  products: Products;
}

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
