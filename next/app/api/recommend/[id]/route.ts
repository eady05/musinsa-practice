import { NextResponse } from 'next/server';
import { recommendProducts } from '@/src/services/recommend.service';
import { validateRecommendId } from '@/src/validators/recommend.validator';
import { handleError } from '@/src/errors/error.handler';

export const GET = async (_request: Request, context: { params: { id?: string } }) => {
  try {
    const id = validateRecommendId(context.params?.id);
    const results = await recommendProducts(id);
    return NextResponse.json(results);
  } catch (error) {
    return handleError(error);
  }
};
