import { getAllProducts, getProductById } from '../data/product.repository';
import { NotFoundError } from '../errors/error.types';
import { calculateSimilarityScore, hasTagOverlap, withinPriceRange } from './similarity.service';

export interface RecommendationItem {
  id: number;
  name: string;
  brand: string;
  similarityScore: number;
}

export const recommendProducts = async (id: number): Promise<RecommendationItem[]> => {
  const product = await getProductById(id);
  if (!product) {
    throw new NotFoundError('상품을 찾을 수 없습니다.');
  }

  const products = await getAllProducts();

  return products
    .filter((candidate) => candidate.id !== product.id)
    .filter((candidate) => candidate.category === product.category)
    .filter((candidate) => withinPriceRange(product, candidate))
    .filter((candidate) => hasTagOverlap(product, candidate))
    .map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      brand: candidate.brand,
      similarityScore: Number(calculateSimilarityScore(product, candidate).toFixed(2))
    }))
    .sort((a, b) => b.similarityScore - a.similarityScore);
};
