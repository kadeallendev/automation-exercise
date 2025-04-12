import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.SleevelessDress] });

test.describe('Test Case 9: Search Product', { tag: ['@e2e', '@TC-09'] }, () => {
  test('Verify Searching for Products', async ({ homePage, productsPage, productDetailsPage, testProducts }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('Search Product', async () => {
      await productsPage.searchForProduct(testProduct.product.name);
    });
    await test.step('View Product Details', async () => {
      await productsPage.clickFirstProductOnSearchedProducts();
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
