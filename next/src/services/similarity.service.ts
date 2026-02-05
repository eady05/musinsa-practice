import { Product } from '../data/product.repository';

export const calculateSimilarityScore = (source: Product, target: Product): number => {
  const categoryScore = source.category === target.category ? 1 : 0;
  const priceSimilarity = 1 - Math.abs(source.price - target.price) / Math.max(source.price, target.price);
  const sourceTags = new Set(source.tags);
  const targetTags = new Set(target.tags);
  const intersectionCount = Array.from(sourceTags).filter((tag) => targetTags.has(tag)).length;
  const unionCount = new Set([...sourceTags, ...targetTags]).size;
  const tagSimilarity = unionCount === 0 ? 0 : intersectionCount / unionCount;

  return 0.5 * categoryScore + 0.3 * priceSimilarity + 0.2 * tagSimilarity;
};

export const hasTagOverlap = (source: Product, target: Product): boolean => {
  const sourceTags = new Set(source.tags);
  return target.tags.some((tag) => sourceTags.has(tag));
};

export const withinPriceRange = (source: Product, target: Product): boolean => {
  const diff = Math.abs(source.price - target.price);
  return diff <= source.price * 0.2;
};
