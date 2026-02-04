import { recommendProducts } from '../src/services/recommend.service';
import { resetProductCache } from '../src/data/product.loader';


describe('recommendProducts', () => {
  beforeEach(() => {
    resetProductCache();
  });

  it('returns recommendations sorted by similarity', async () => {
    const results = await recommendProducts(1);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].similarityScore).toBeGreaterThanOrEqual(
      results[results.length - 1].similarityScore
    );
  });
});
