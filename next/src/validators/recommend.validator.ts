import { BadRequestError } from '../errors/error.types';

export const validateRecommendId = (idParam: string | string[] | undefined): number => {
  if (!idParam || Array.isArray(idParam)) {
    throw new BadRequestError('id는 필수입니다.');
  }

  const parsed = Number(idParam);
  if (Number.isNaN(parsed)) {
    throw new BadRequestError('id는 숫자여야 합니다.');
  }

  return parsed;
};
