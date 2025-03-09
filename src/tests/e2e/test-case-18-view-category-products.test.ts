import { test } from '../../fixtures/base-pom';

test.describe('Test Case 18: View Category Products', { tag: ['@e2e', '@TC-18'] }, () => {
  test('Filter Products based on Category', async ({ homePage }) => {
    await test.step('Filter Category', async () => {
      await homePage.landedOn();
      await homePage.filterCategory('Women', 'Dress');
      await homePage.filterCategory('Men', 'Jeans');
      await homePage.filterCategory('Women', 'Tops');
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
