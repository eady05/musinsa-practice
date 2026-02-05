import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Product } from './product.repository';
import { DataLoadError } from '../errors/error.types';

let cachedProducts: Product[] | null = null;

export const loadProducts = async (): Promise<Product[]> => {
  if (cachedProducts) {
    return cachedProducts;
  }

  try {
    const filePath = resolve(process.cwd(), 'data', 'products.json');
    const content = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(content) as Product[];
    cachedProducts = parsed;
    return parsed;
  } catch (error) {
    throw new DataLoadError('상품 데이터를 불러오지 못했습니다.', error as Error);
  }
};

export const resetProductCache = (): void => {
  cachedProducts = null;
};
