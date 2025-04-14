import { ProductData } from 'page-object-model/data/product-data';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.BlueTop] });

test.describe('Test Case 8: Verify All Products and product detail page', { tag: ['@e2e', '@TC-08'] }, () => {
  test('Check All Products and Products Detail', async ({ homePage, productsPage, productDetailsPage, testProducts }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateToAllProducts(homePage, productsPage, testProduct);
    });
    await test.step('View Product Details', async () => {
      await ProductWorkflow.viewFirstProductDetails(productsPage, productDetailsPage, testProduct);
    });
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateBackToAllProducts(productDetailsPage, productsPage, testProduct);
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
