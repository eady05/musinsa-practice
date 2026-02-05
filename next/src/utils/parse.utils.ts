export const parseNumber = (value: string | null, fieldName: string): number | null => {
  if (value === null || value === '') {
    return null;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`${fieldName}는 숫자여야 합니다.`);
  }
  return parsed;
};

export const parseTags = (value: string | null): string[] => {
  if (!value) {
    return [];
  }
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
};
