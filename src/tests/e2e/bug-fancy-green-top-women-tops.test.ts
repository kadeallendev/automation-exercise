import { test } from '../../fixtures/base-pom-fixture';
import { ProductData } from '../../page-object-model/data/product-data';

test.describe('Bug: Fancy Green Top not displayed in Women > Tops category', { tag: ['@e2e', '@bug', '@fancy-green-top', '@women-tops'] }, () => {
  test('should display Fancy Green Top when filtering by Women > Tops category', async ({ homePage, categoryProductsPage }) => {
    await test.step('Go to Home Page', async () => {
      await homePage.landedOn();
    });
    await test.step('Filter by Women > Tops category', async () => {
      // Get the category/subcategory mapping for the product's category ID
      const filter = ProductData.getCategorySubCategoryById(ProductData.ProductCategoryId.WomenTops);
      if (!filter) throw new Error(`Invalid ProductCategoryId: ${ProductData.ProductCategoryId.WomenTops}`);

      await homePage.filterCategory(ProductData.ProductCategoryId.WomenTops);

      await categoryProductsPage.landedOn(filter);
    });
    await test.step('Check Fancy Green Top is visible', async () => {
      await categoryProductsPage.checkProductVisible(ProductData.ProductName.FancyGreenTop);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
