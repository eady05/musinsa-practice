import { getAllProducts, Product } from '../data/product.repository';
import { SearchQuery } from '../validators/search.validator';

export interface SearchResultItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  tags: string[];
}

const matchesKeyword = (product: Product, keyword: string): boolean => {
  const lowerKeyword = keyword.toLowerCase();
  return (
    product.name.toLowerCase().includes(lowerKeyword) ||
    product.brand.toLowerCase().includes(lowerKeyword)
  );
};

const includesAllTags = (product: Product, tags: string[]): boolean => {
  if (tags.length === 0) {
    return true;
  }
  const productTags = new Set(product.tags.map((tag) => tag.toLowerCase()));
  return tags.every((tag) => productTags.has(tag.toLowerCase()));
};

export const searchProducts = async (query: SearchQuery): Promise<SearchResultItem[]> => {
  const products = await getAllProducts();

  return products
    .filter((product) => product.stock >= 1)
    .filter((product) => matchesKeyword(product, query.keyword))
    .filter((product) => (query.category ? product.category === query.category : true))
    .filter((product) => (query.minPrice !== undefined ? product.price >= query.minPrice : true))
    .filter((product) => (query.maxPrice !== undefined ? product.price <= query.maxPrice : true))
    .filter((product) => includesAllTags(product, query.tags))
    .map((product) => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      tags: product.tags
    }));
};
