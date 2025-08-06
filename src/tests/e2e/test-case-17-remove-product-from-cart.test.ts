import { ProductData } from 'page-object-model/data/product-data';
import { CartWorkflow } from 'page-object-model/workflows/cart-workflow';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';

test.use({
  productNames: [ProductData.ProductName.BlueTop, ProductData.ProductName.MenTShirt]
});

test.describe('Test Case 17: Remove Products from Cart page', { tag: ['@e2e', '@TC-17'] }, () => {
  test('Add and then Remove Product from Cart', async ({ homePage, productsPage, viewCartPage, testProducts }) => {
    const testProduct1 = testProducts[0] as ProductData.ProductData;
    const testProduct2 = testProducts[1] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateToAllProducts(homePage, productsPage, testProduct1);
    });
    await test.step('Add Products to Cart', async () => {
      await CartWorkflow.addTwoProductsToCart(productsPage, testProduct1, testProduct2);
    });
    await test.step('Verify Products in Cart', async () => {
      await CartWorkflow.verifyProductsInCart(viewCartPage, testProduct1, testProduct2);
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
