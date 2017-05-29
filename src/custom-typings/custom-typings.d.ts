// State specific
interface RXState {
  products: Products;
  searchTerm: string;
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

// Table specific
interface Field {
  label: string;
  key: string
}
