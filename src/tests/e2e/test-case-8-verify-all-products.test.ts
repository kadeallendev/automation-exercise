import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.BlueTop] });

test.describe('Test Case 8: Verify All Products and product detail page', { tag: ['@e2e', '@TC-08'] }, () => {
  test('Check All Products and Products Detail', async ({ homePage, productsPage, productDetailsPage, testProducts }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('View Product Details', async () => {
      await productsPage.clickFirstViewProductOnAllProducts();
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Navigate to All Products', async () => {
      await productDetailsPage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
