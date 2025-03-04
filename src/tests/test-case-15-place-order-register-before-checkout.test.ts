import { test } from '@playwright/test';
import { ProductData } from 'page-object-model/data/product-data';
import { UserData } from 'page-object-model/data/user-data';
import { CheckoutPage } from 'page-object-model/pages/checkout';
import { blockAds } from 'page-object-model/pages/common';
import { DeleteAccountPage } from 'page-object-model/pages/delete-account';
import { HomePage } from 'page-object-model/pages/home';
import { PaymentPage } from 'page-object-model/pages/payment';
import { PaymentDonePage } from 'page-object-model/pages/payment_done';
import { ProductDetailsPage } from 'page-object-model/pages/product-details';
import { ProductsPage } from 'page-object-model/pages/products';
import { ViewCartPage } from 'page-object-model/pages/view-cart';
import { AccountWorkflow } from 'page-object-model/workflows/account-workflow';

let testUser: UserData.User;
let testProduct: ProductData.ProductData;

test.describe('Test Case 15: Place Order: Register before Checkout', () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
      const product = ProductData.getProductByName(ProductData.ProductName.SummerWhiteTop);
      testProduct = new ProductData.ProductContext(product);
    });
  });
  test('Register User Then Delete', async ({ page }) => {
    await test.step('Block adds in website', async () => {
      await blockAds(page);
    });
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Execute Register User Workflow', async () => {
      await AccountWorkflow.RegisterUser(page, testUser);
    });
    await test.step('Navigate to All Products', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickProducts();
      const productsPage = new ProductsPage(page);
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('View Product Details', async () => {
      const productsPage = new ProductsPage(page);
      await productsPage.clickViewProductOnAllProducts(testProduct.product.id);
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });
    await test.step('Increase Quantity', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.setQuantity(testProduct);
    });
    await test.step('Add to Cart', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.addToCart();
    });
    await test.step('View Cart ', async () => {
      const productDetailsPage = new ProductDetailsPage(page);
      await productDetailsPage.landedOn();
      await productDetailsPage.clickViewCart();
    });
    await test.step('Verify Products in Cart', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.checkProductDetailInCart(testProduct);
    });
    await test.step('Proceed to Checkout', async () => {
      const viewCartPage = new ViewCartPage(page);
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
    });
    await test.step('Checkout', async () => {
      const checkoutPage = new CheckoutPage(page);
      await checkoutPage.landedOn();
      await checkoutPage.verifyOrderDetails(testUser, testProduct);
      await checkoutPage.fillMessage();
      await checkoutPage.clickPlaceOrder();
    });
    await test.step('Payment', async () => {
      const paymentPage = new PaymentPage(page);
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
      const paymentDonePage = new PaymentDonePage(page);
      await paymentDonePage.landedOn();
      await paymentDonePage.checkOrderPlaced();
      await paymentDonePage.clickContinue();
    });
    await test.step('Delete Account', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickDeleteAccount();
      const deleteAccount = new DeleteAccountPage(page);
      await deleteAccount.landedOn();
      await deleteAccount.checkAccountDeleted();
      await deleteAccount.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedOut();
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
