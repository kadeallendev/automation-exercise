import { ProductData } from 'page-object-model/data/product-data';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.use({ productNames: [ProductData.ProductName.SummerWhiteTop] });

test.describe('Test Case 23: Verify Address Details on Checkout', { tag: ['@e2e', '@TC-23'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Place order and verify Checkout addresses', async ({ homePage, productsPage, productDetailsPage, viewCartPage, loginPage, checkoutPage, testProducts, testUser }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Login User', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await homePage.checkUserLoggedIn(testUser.displayName);
    });

    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('View Product Details', async () => {
      await productsPage.clickViewProductOnAllProducts(testProduct.product.id);
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Increase Quantity', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.setQuantity(testProduct);
    });
    await test.step('Add to Cart', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.addToCart();
    });
    await test.step('View Cart ', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct);
    });
    await test.step('Proceed to Checkout', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
    });
    await test.step('Verify Checkout Details', async () => {
      await checkoutPage.landedOn();
      await checkoutPage.verifyOrderDetails(testUser, testProduct);
      await checkoutPage.verifyFullDeliveryAddressDetails(testUser);
      await checkoutPage.verifyFullBillingAddressDetails(testUser);
      await viewCartPage.clickHome();
    });
  });
  test.afterEach(async ({ verifyLoginHelper, deleteAccountHelper, testUser, homePage }) => {
    await test.step('Delete User via API if exists', async () => {
      await teardownUser(verifyLoginHelper, deleteAccountHelper, testUser);
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
