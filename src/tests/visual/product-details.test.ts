import { expect } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom';

let testProduct: ProductData.ProductData;

test.describe('Product Details Page Visual Regression', { tag: '@visual' }, () => {
  test.beforeAll(async () => {
    test.skip(!!process.env.CI, 'Skipping visual regression test in CI, until snapshots are updated');
  });
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.BlueTop);
      testProduct = new ProductData.ProductContext(product);
    });
  });
  test('Check Product Details Page', async ({ homePage, productsPage, productDetailsPage }) => {
    await test.step('Navigate to Product Details', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.clickFirstViewProductOnAllProducts();
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Verify Product Details Page Snapshot', async () => {
      await productDetailsPage.landedOn();
      await expect(productDetailsPage.getPage()).toHaveScreenshot('product-details-page.png');
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
