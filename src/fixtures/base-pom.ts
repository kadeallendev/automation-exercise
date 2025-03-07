import { test as base } from '@playwright/test';
import { AccountCreatePage } from 'page-object-model/pages/account-created';
import { BrandProductsPage } from 'page-object-model/pages/brand_products';
import { CheckoutPage } from 'page-object-model/pages/checkout';
import { blockAds } from 'page-object-model/pages/common';
import { ContactUsPage } from 'page-object-model/pages/contact-us';
import { DeleteAccountPage } from 'page-object-model/pages/delete-account';
import { HomePage } from 'page-object-model/pages/home';
import { LoginPage } from 'page-object-model/pages/login';
import { PaymentPage } from 'page-object-model/pages/payment';
import { PaymentDonePage } from 'page-object-model/pages/payment_done';
import { ProductDetailsPage } from 'page-object-model/pages/product-details';
import { ProductsPage } from 'page-object-model/pages/products';
import { SignUpPage } from 'page-object-model/pages/signup';
import { TestCasesPage } from 'page-object-model/pages/test-cases';
import { ViewCartPage } from 'page-object-model/pages/view-cart';

const test = base.extend<{
  homePage: HomePage;
  accountCreatePage: AccountCreatePage;
  brandProductsPage: BrandProductsPage;
  checkoutPage: CheckoutPage;
  contactUsPage: ContactUsPage;
  deleteAccountPage: DeleteAccountPage;
  loginPage: LoginPage;
  paymentDonePage: PaymentDonePage;
  paymentPage: PaymentPage;
  productDetailsPage: ProductDetailsPage;
  productsPage: ProductsPage;
  signUpPage: SignUpPage;
  testCasesPage: TestCasesPage;
  viewCartPage: ViewCartPage;
}>({
  homePage: async ({ page }, use) => {
    await blockAds(page);
    const homePage = new HomePage(page);
    await homePage.navigateTo();
    await use(homePage);
  },
  accountCreatePage: async ({ homePage }, use) => {
    const accountCreatePage = new AccountCreatePage(homePage.getPage());
    await use(accountCreatePage);
  },
  brandProductsPage: async ({ homePage }, use) => {
    const brandProductsPage = new BrandProductsPage(homePage.getPage());
    await use(brandProductsPage);
  },
  checkoutPage: async ({ homePage }, use) => {
    const checkoutPage = new CheckoutPage(homePage.getPage());
    await use(checkoutPage);
  },
  contactUsPage: async ({ homePage }, use) => {
    const contactUsPage = new ContactUsPage(homePage.getPage());
    await use(contactUsPage);
  },
  deleteAccountPage: async ({ homePage }, use) => {
    const deleteAccountPage = new DeleteAccountPage(homePage.getPage());
    await use(deleteAccountPage);
  },
  loginPage: async ({ homePage }, use) => {
    const loginPage = new LoginPage(homePage.getPage());
    await use(loginPage);
  },
  paymentDonePage: async ({ homePage }, use) => {
    const paymentDonePage = new PaymentDonePage(homePage.getPage());
    await use(paymentDonePage);
  },
  paymentPage: async ({ homePage }, use) => {
    const paymentPage = new PaymentPage(homePage.getPage());
    await use(paymentPage);
  },
  productDetailsPage: async ({ homePage }, use) => {
    const productDetailsPage = new ProductDetailsPage(homePage.getPage());
    await use(productDetailsPage);
  },
  productsPage: async ({ homePage }, use) => {
    const productsPage = new ProductsPage(homePage.getPage());
    await use(productsPage);
  },
  signUpPage: async ({ homePage }, use) => {
    const signUpPage = new SignUpPage(homePage.getPage());
    await use(signUpPage);
  },
  testCasesPage: async ({ homePage }, use) => {
    const testCasesPage = new TestCasesPage(homePage.getPage());
    await use(testCasesPage);
  },
  viewCartPage: async ({ homePage }, use) => {
    const viewCartPage = new ViewCartPage(homePage.getPage());
    await use(viewCartPage);
  }
});

export { test };
