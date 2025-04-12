import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.BlueTop, ProductData.ProductName.MenTshirt] });

test.describe('Test Case 12: Add Products in Cart', { tag: ['@e2e', '@TC-12'] }, () => {
  test('Add Products to the Cart and verify the Cart', async ({ homePage, productsPage, viewCartPage, testProducts }) => {
    const testProduct1 = testProducts[0] as ProductData.ProductData;
    const testProduct2 = testProducts[1] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct1);
    });
    await test.step('Add Products to Cart', async () => {
      await productsPage.landedOn();
      await productsPage.addToCart(0);
      await productsPage.clickContinueShopping();
      await productsPage.addToCart(1);
      await productsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct1);
      await viewCartPage.checkProductDetailInCart(testProduct2);
    });
    await test.step('Navigate to Home', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickHome();
      await homePage.landedOn();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
