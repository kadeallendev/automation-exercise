import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Bug: Sleeveless Dress not visible in Madame brand filter', { tag: ['@e2e', '@bug', '@brand-madame'] }, () => {
  test('Should display Sleeveless Dress when filtering by Madame', async ({ homePage, brandProductsPage }) => {
    await test.step('Filter by Madame brand', async () => {
      await homePage.landedOn();
      await homePage.filterBrand(ProductData.ProductBrand.Madame);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Madame);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Madame);
      await brandProductsPage.checkProductVisible(ProductData.ProductName.SleevelessDress);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
