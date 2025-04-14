import { CommonData } from 'page-object-model/data/common-data';
import { ProductData } from 'page-object-model/data/product-data';
import { CartWorkflow } from 'page-object-model/workflows/cart-workflow';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.use({ productNames: [ProductData.ProductName.SummerWhiteTop] });

test.describe('Test Case 16: Place Order: Login before Checkout', { tag: ['@e2e', '@TC-16'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Register User Then Delete', async ({
    homePage,
    productsPage,
    productDetailsPage,
    viewCartPage,
    loginPage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    testProducts,
    testUser
  }) => {
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
    await test.step('Proceed to Checkout', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
    });
    await test.step('Checkout', async () => {
      await checkoutPage.landedOn();
      await checkoutPage.verifyOrderDetails(testUser, testProduct);
      await checkoutPage.fillMessage(CommonData.randomSentence());
      await checkoutPage.clickPlaceOrder();
    });
    await test.step('Payment', async () => {
      await paymentPage.landedOn();
      const fullName = `${testUser.firstName} ${testUser.lastName}`;
      await paymentPage.enterCardOwner(fullName);
      await paymentPage.enterCardNumber(testUser.creditCard.number);
      await paymentPage.enterCardCvc(testUser.creditCard.ccv);
      await paymentPage.enterCardExpiryMonth(testUser.creditCard.expiryMonth);
      await paymentPage.enterCardExpiryYear(testUser.creditCard.expiryYear);
      await paymentPage.clickPayAndConfirmOrder();
    });
    await test.step('Payment', async () => {
      await paymentDonePage.landedOn();
      await paymentDonePage.checkOrderPlaced();
      await paymentDonePage.clickContinue();
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
