import { searchProducts } from '../src/services/search.service';
import { SearchQuery } from '../src/validators/search.validator';
import { resetProductCache } from '../src/data/product.loader';

const makeQuery = (overrides: Partial<SearchQuery>): SearchQuery => ({
  keyword: 'musinsa',
  tags: [],
  ...overrides
});

describe('searchProducts', () => {
  beforeEach(() => {
    resetProductCache();
  });

  it('filters by keyword and stock', async () => {
    const results = await searchProducts(makeQuery({ keyword: 'denim' }));
    expect(results).toHaveLength(0);
  });

  it('filters by category and tags', async () => {
    const results = await searchProducts(
      makeQuery({
        keyword: 'tee',
        category: 'top',
        tags: ['cotton', 'basic']
      })
    );

    expect(results).toEqual([
      expect.objectContaining({ name: 'Basic Cotton T-Shirt' }),
      expect.objectContaining({ name: 'Loose Fit Cotton Tee' })
    ]);
  });

  it('filters by price range', async () => {
    const results = await searchProducts(
      makeQuery({ keyword: 'musinsa', minPrice: 20000, maxPrice: 40000 })
    );

    expect(results.every((item) => item.price >= 20000 && item.price <= 40000)).toBe(true);
  });
});
