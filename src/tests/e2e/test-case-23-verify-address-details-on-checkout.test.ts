import { ProductData } from 'page-object-model/data/product-data';
import { UserData } from 'page-object-model/data/user-data';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;
let testProduct: ProductData.ProductData;

test.describe('Test Case 23: Verify Address Details on Checkout', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
      const product = ProductData.getProductByName(ProductData.ProductName.SummerWhiteTop);
      testProduct = new ProductData.ProductContext(product);
    });
  });
  test('Place order and verify Checkout addresses', async ({
    homePage,
    productsPage,
    productDetailsPage,
    viewCartPage,
    loginPage,
    signUpPage,
    accountCreatePage,
    checkoutPage,
    deleteAccountPage
  }) => {
    await test.step('Execute Register User Workflow', async () => {
      await AccountWorkflow.RegisterUser(homePage, loginPage, signUpPage, accountCreatePage, testUser);
    });

    await test.step('Logout User', async () => {
      await homePage.landedOn();
      await homePage.clickLogout();
      await loginPage.landedOn();
      await loginPage.clickHome();
      await homePage.checkUserLoggedOut();
    });
    await test.step('Login User', async () => {
      await homePage.landedOn();
      await homePage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await homePage.checkUserLoggedIn(testUser.userName);
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
    await test.step('Delete Account', async () => {
      await homePage.landedOn();
      await homePage.clickDeleteAccount();
      await deleteAccountPage.landedOn();
      await deleteAccountPage.checkAccountDeleted();
      await deleteAccountPage.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
