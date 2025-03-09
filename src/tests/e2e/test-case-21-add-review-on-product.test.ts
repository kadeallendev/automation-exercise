import { CommonData } from 'page-object-model/data/common-data';
import { ProductData } from 'page-object-model/data/product-data';
import { UserData } from 'page-object-model/data/user-data';
import { test } from '../../fixtures/base-pom';

let testUser: UserData.User;
let testProduct: ProductData.ProductData;

test.describe('Test Case 21: Add Review on Product', { tag: ['@e2e', '@TC-21'] }, () => {
  test.beforeEach(async () => {
    await test.step('Setup Test Data', async () => {
      testUser = UserData.createUser();
      const product = ProductData.getProductByName(ProductData.ProductName.BlueTop);
      testProduct = new ProductData.ProductContext(product);
    });
  });

  test('Go to Product Detail and Add Review', async ({ homePage, productsPage, productDetailsPage }) => {
    await test.step('Navigate to All Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
      await productsPage.landedOn();
      await productsPage.checkAllProductsForProduct(testProduct);
    });
    await test.step('View Product Details', async () => {
      await productsPage.clickFirstViewProductOnAllProducts();
      await productDetailsPage.landedOn();
      await productDetailsPage.checkProductDetailsForProduct(testProduct);
    });

    await test.step('Write Product Review', async () => {
      await productDetailsPage.landedOn();
      await productDetailsPage.checkReviewLink();
      const fullName = `${testUser.firstName} ${testUser.lastName}`;
      await productDetailsPage.enterReviewerName(fullName);
      await productDetailsPage.enterReviewerEmail(testUser.email);
      await productDetailsPage.enterReview(CommonData.randomParagraph());
      await productDetailsPage.submitReview();
      await productDetailsPage.checkReviewSubmitted();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Delete User if Logged In', async () => {
      if (await homePage.isUserLoggedIn()) {
        await homePage.clickDeleteAccount();
      }
    });
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
