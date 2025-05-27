// E2E test for bug: 'Summer White Top' not displayed when filtering by Brands > H&M
// Scenario: As a test automation expert with knowledge of Playwright MCP, if you encounter a login page, let me enter the credentials.
import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Bug: Summer White Top not displayed for H&M brand filter', { tag: ['@e2e', '@bug', '@brand-filter'] }, () => {
  test('Should display "Summer White Top" when filtering by Brands > H&M', async ({ homePage, brandProductsPage }) => {
    await test.step('Navigate to home and filter by H&M', async () => {
      await homePage.landedOn();
      await homePage.filterBrand(ProductData.ProductBrand.HAndM);
      await brandProductsPage.landedOn(ProductData.ProductBrand.HAndM);
      await brandProductsPage.checkBrandBanner(ProductData.ProductBrand.HAndM);
    });
    await test.step('Verify "Summer White Top" is visible', async () => {
      await brandProductsPage.checkProductVisible(ProductData.ProductName.SummerWhiteTop);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
