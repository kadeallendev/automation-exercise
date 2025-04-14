import { ProductData } from 'page-object-model/data/product-data';
import { CartWorkflow } from 'page-object-model/workflows/cart-workflow';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';

test.use({ productNames: [ProductData.ProductName.StylishDress] });

test.describe('Test Case 13: Verify Product Quantity correct in Cart page', { tag: ['@e2e', '@TC-13'] }, () => {
  test('Add Products to Cart and Verify Quantity is Correct', async ({ homePage, productsPage, productDetailsPage, viewCartPage, testProducts }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    testProduct.product.quantity = 4; // Set the quantity for the test product
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateToAllProducts(homePage, productsPage, testProduct);
    });
    await test.step('View Product Details', async () => {
      await ProductWorkflow.viewProductDetails(productsPage, productDetailsPage, testProduct);
    });
    await test.step('Increase Quantity and Add to Cart', async () => {
      await ProductWorkflow.increaseQuantityAddToCart(productDetailsPage, testProduct);
    });
    await test.step('Verify Products in Cart', async () => {
      await CartWorkflow.verifyProductInCart(viewCartPage, testProduct);
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
