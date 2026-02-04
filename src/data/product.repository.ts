import { loadProducts } from './product.loader';

export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  tags: string[];
  stock: number;
}

export const getAllProducts = async (): Promise<Product[]> => loadProducts();

export const getProductById = async (id: number): Promise<Product | undefined> => {
  const products = await loadProducts();
  return products.find((product) => product.id === id);
};
