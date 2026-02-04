import { NextResponse } from 'next/server';
import { searchProducts } from '@/src/services/search.service';
import { validateSearchQuery } from '@/src/validators/search.validator';
import { handleError } from '@/src/errors/error.handler';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const query = validateSearchQuery(searchParams);
    const results = await searchProducts(query);
    return NextResponse.json(results);
  } catch (error) {
    return handleError(error);
  }
};
