import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.BlueTop, ProductData.ProductName.MenTshirt] });

test.describe('Test Case 17: Remove Products from Cart page', { tag: ['@e2e', '@TC-17'] }, () => {
  test('Add and then Remove Product from Cart', async ({ homePage, productsPage, viewCartPage, testProducts }) => {
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
    await test.step('Remove Products from Cart', async () => {
      await viewCartPage.landedOn();
      if (testProduct1) {
        await viewCartPage.removeProductFromCart(testProduct1.product.id);
      }
      if (testProduct2) {
        await viewCartPage.removeProductFromCart(testProduct2.product.id);
      }
    });
    await test.step('Remove Products from Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkCartIsEmpty();
      await viewCartPage.clickHereToReturnToProducts();
    });

    await test.step('Navigate to Home', async () => {
      await productsPage.landedOn();
      await productsPage.clickHome();
      await homePage.landedOn();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
