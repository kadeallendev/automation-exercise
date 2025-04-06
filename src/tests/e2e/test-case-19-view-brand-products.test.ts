import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Test Case 19: View Brand Products', { tag: ['@e2e', '@TC-19'] }, () => {
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
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
