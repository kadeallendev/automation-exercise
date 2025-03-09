import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/base-pom';

let testProduct: ProductData.ProductData;

test.describe('Test Case 9: Search Product', { tag: ['@e2e', '@TC-9'] }, () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      const product = ProductData.getProductByName(ProductData.ProductName.SleevelessDress);
      testProduct = new ProductData.ProductContext(product);
    });
  });

  test('Verify Searching for Products', async ({ homePage, productsPage, productDetailsPage }) => {
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
