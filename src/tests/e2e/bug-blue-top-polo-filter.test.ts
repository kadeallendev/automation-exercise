import { test } from '../../fixtures/base-pom-fixture';
import { ProductData } from '../../page-object-model/data/product-data';

test.describe('Bug: Blue Top not displayed in POLO brand filter', { tag: ['@e2e', '@bug', '@blue-top', '@polo'] }, () => {
  test('should display Blue Top when filtering by POLO brand', async ({ homePage, brandProductsPage }) => {
    await test.step('Go to Home Page', async () => {
      await homePage.landedOn();
    });
    await test.step('Filter by POLO brand', async () => {
      await homePage.filterBrand(ProductData.ProductBrand.Polo);
      await brandProductsPage.landedOn(ProductData.ProductBrand.Polo);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.Polo);
    });
    await test.step('Check Blue Top is visible', async () => {
      await brandProductsPage.checkProductVisible(ProductData.ProductName.BlueTop);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
