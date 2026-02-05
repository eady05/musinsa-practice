import { NextResponse } from 'next/server';
import { BadRequestError, DataLoadError, NotFoundError } from './error.types';

export const handleError = (error: unknown) => {
  if (error instanceof BadRequestError || error instanceof NotFoundError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  if (error instanceof DataLoadError) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: '알 수 없는 오류가 발생했습니다.' }, { status: 500 });
};
