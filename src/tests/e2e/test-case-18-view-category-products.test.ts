import { test } from '../../fixtures/base-pom-fixture';
import { ProductData } from '../../page-object-model/data/product-data';

test.describe('Test Case 18: View Category Products', { tag: ['@e2e', '@TC-18'] }, () => {
  test('Filter Products based on Category', async ({ homePage }) => {
    await test.step('Filter Category', async () => {
      await homePage.landedOn();
      await homePage.filterCategory(ProductData.ProductCategoryId.WomenDress);
      await homePage.filterCategory(ProductData.ProductCategoryId.MenJeans);
      await homePage.filterCategory(ProductData.ProductCategoryId.WomenTops);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
