import { BadRequestError } from '../errors/error.types';
import { parseNumber, parseTags } from '../utils/parse.utils';

export interface SearchQuery {
  keyword: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags: string[];
}

export const validateSearchQuery = (searchParams: URLSearchParams): SearchQuery => {
  const keyword = searchParams.get('keyword');
  if (!keyword) {
    throw new BadRequestError('keyword는 필수입니다.');
  }

  let minPrice: number | null = null;
  let maxPrice: number | null = null;

  try {
    minPrice = parseNumber(searchParams.get('minPrice'), 'minPrice');
    maxPrice = parseNumber(searchParams.get('maxPrice'), 'maxPrice');
  } catch (error) {
    throw new BadRequestError((error as Error).message);
  }

  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    throw new BadRequestError('minPrice는 maxPrice보다 클 수 없습니다.');
  }

  return {
    keyword,
    category: searchParams.get('category') ?? undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    tags: parseTags(searchParams.get('tags'))
  };
};
