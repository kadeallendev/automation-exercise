import { CommonData } from 'page-object-model/data/common-data';
import { ProductData } from 'page-object-model/data/product-data';
import { UserData } from 'page-object-model/data/user-data';
import { test } from '../../fixtures/extended-test';
import { teardownUser } from '../../fixtures/user-management-fixture';

test.use({ productNames: [ProductData.ProductName.WinterTop] });

test.describe('Test Case 24: Download Invoice After Purchase Order', { tag: ['@e2e', '@TC-24'] }, () => {
  test('Place Order and Register while Checking Out and Download Invoice', async ({
    browserName,
    homePage,
    productsPage,
    productDetailsPage,
    viewCartPage,
    loginPage,
    signUpPage,
    accountCreatePage,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    testProducts,
    testUser
  }) => {
    const testProduct = testProducts[0] as ProductData.ProductData;
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
    await test.step('Proceed to Checkout and Register', async () => {
      await viewCartPage.landedOn();
      await viewCartPage.clickProceedToCheckout();
      await viewCartPage.clickRegisterLogin();
    });
    await test.step('Enter Account Information', async () => {
      await loginPage.landedOn();
      await loginPage.checkNewUserSignup();
      await loginPage.enterNewUserName(testUser.userName);
      await loginPage.enterNewUserEmail(testUser.email);
      await loginPage.clickSignup();
    });
    await test.step('Enter Account Information', async () => {
      await signUpPage.landedOn();
      await signUpPage.checkEnterAccountInformation();
      await signUpPage.enterPassword(testUser.password);
      await signUpPage.selectBirthDate(testUser.birthDate);
      if (testUser.newsletter) {
        await signUpPage.checkNewsletter();
      }
      if (testUser.offers) {
        await signUpPage.checkSpecialOffers();
      }
      await signUpPage.checkTitle(testUser.gender);
      await signUpPage.enterFirstName(testUser.firstName);
      await signUpPage.enterLastName(testUser.lastName);
      await signUpPage.enterCompany(testUser.company);
      await signUpPage.enterAddress(testUser.address);
      await signUpPage.enterAddress2(testUser.address2);
      await signUpPage.selectCountry(UserData.getCountryFromCode(testUser.location.country));
      await signUpPage.enterState(testUser.location.state);
      await signUpPage.enterCity(testUser.location.city);
      await signUpPage.enterZip(testUser.location.zip);
      await signUpPage.enterMobileNumber(testUser.mobileNumber);
      await signUpPage.clickCreateAccount();
    });
    await test.step('Check Account Created', async () => {
      await accountCreatePage.landedOn();
      await accountCreatePage.checkAccountCreated();
      await accountCreatePage.clickContinue();
      await homePage.landedOn();
      await homePage.checkUserLoggedIn(testUser.userName);
    });
    await test.step('Proceed to Checkout', async () => {
      await homePage.landedOn();
      await homePage.clickCart();
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
    await test.step('Verify Order Placed', async () => {
      await paymentDonePage.landedOn();
      await paymentDonePage.checkOrderPlaced();
    });

    await test.step('Download Invoice', async (step) => {
      if (browserName === 'webkit' && process.env.CI) {
        console.warn('Skipping download invoice test step on WebKit in CI');
        step.skip();
      }
      await paymentDonePage.landedOn();
      const filePath = await paymentDonePage.downloadInvoice();
      const fullName = `${testUser.firstName} ${testUser.lastName}`;
      const total = Number(testProduct.totalDisplayText.replace('Rs. ', ''));
      await paymentDonePage.verifyInvoiceContents(filePath, fullName, total);
    });
    await test.step('Continue off Payment Page', async () => {
      await paymentDonePage.landedOn();
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
