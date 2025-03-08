import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../fixtures/base-pom';

test.describe('Test Case 19: View Brand Products', () => {
  test('Filter Products based on Brand', async ({ homePage, brandProductsPage }) => {
    await test.step('Filter Products', async () => {
      await homePage.landedOn();
      await homePage.filterBrand(ProductData.ProductBrand.Polo);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Polo);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Polo);
      await brandProductsPage.clickHome();
      await homePage.filterBrand(ProductData.ProductBrand.Madame);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Madame);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Madame);
      await brandProductsPage.clickHome();
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
