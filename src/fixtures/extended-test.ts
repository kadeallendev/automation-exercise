import { ProductData } from 'page-object-model/data/product-data';
import type { UserData } from 'page-object-model/data/user-data';
import type { CreateAccountHelper } from '../api/create-account-helper';
import type { DeleteAccountHelper } from '../api/delete-account-helper';
import type { VerifyLoginHelper } from '../api/verify-login-helper';
import { test as baseTest } from './base-pom-fixture';
import { userFixtures } from './user-management-fixture';

// Extend the base test with user management fixture
const test = baseTest.extend<{
  testUser: UserData.User;
  verifyLoginHelper: VerifyLoginHelper;
  createAccountHelper: CreateAccountHelper;
  deleteAccountHelper: DeleteAccountHelper;
  testProducts: ProductData.ProductData[]; // Support an array of products
  productNames: ProductData.ProductName[]; // Configurable array of product names
}>({
  ...userFixtures,
  productNames: [[ProductData.ProductName.BlueTop], { option: true }], // Default to a single product, but can be overridden
  testProducts: async ({ productNames }, use) => {
    const products = productNames.map((name) => {
      const product = ProductData.getProductByName(name);
      return new ProductData.ProductContext(product);
    });
    await use(products);
  }
});

export { test };
