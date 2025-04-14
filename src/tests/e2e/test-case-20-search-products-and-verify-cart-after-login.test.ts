import { ProductData } from 'page-object-model/data/product-data';
import { CartWorkflow } from 'page-object-model/workflows/cart-workflow';
import { ProductWorkflow } from 'page-object-model/workflows/product-workflow';
import { test } from '../../fixtures/extended-test';
import { setupUser, teardownUser } from '../../fixtures/user-management-fixture';

test.use({ productNames: [ProductData.ProductName.SummerWhiteTop] });

test.describe('Test Case 20: Search Products and Verify Cart After Login', { tag: ['@e2e', '@TC-20'] }, () => {
  test.beforeEach(async ({ verifyLoginHelper, createAccountHelper, testUser }) => {
    await test.step('Register User via API', async () => {
      await setupUser(verifyLoginHelper, createAccountHelper, testUser);
    });
  });
  test('Register User Then Search Add Products to Cart and Verify Login of Cart', async ({
    homePage,
    productsPage,
    productDetailsPage,
    viewCartPage,
    loginPage,
    testProducts,
    testUser
  }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
    await test.step('Navigate to All Products', async () => {
      await ProductWorkflow.navigateToAllProducts(homePage, productsPage, testProduct);
    });
    await test.step('Search Product', async () => {
      await productsPage.searchForProduct(testProduct.product.name);
    });
    await test.step('View Product Details', async () => {
      await ProductWorkflow.viewFirstProductDetails(productsPage, productDetailsPage, testProduct);
    });
    await test.step('Increase Quantity and Add to Cart', async () => {
      await ProductWorkflow.increaseQuantityAddToCart(productDetailsPage, testProduct);
    });
    await test.step('Verify Products in Cart', async () => {
      await CartWorkflow.verifyProductInCart(viewCartPage, testProduct);
    });
    await test.step('Login', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickSignupLogin();
      await loginPage.landedOn();
      await loginPage.enterEmail(testUser.email);
      await loginPage.enterPassword(testUser.password);
      await loginPage.clickLogin();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.displayName);
    });
    await test.step('View Cart as Logged in User', async () => {
      await homePage.landedOn();
      await homePage.clickCart();
      await viewCartPage.landedOn();
    });
    await test.step('Verify Products in Cart', async () => {
      await CartWorkflow.verifyProductInCart(viewCartPage, testProduct);
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
