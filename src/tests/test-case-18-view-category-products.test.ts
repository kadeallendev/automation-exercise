import { test } from '../fixtures/base-pom';

test.describe('Test Case 18: View Category Products', () => {
  test('Filter Products based on Category', async ({ homePage }) => {
    await test.step('Navigate the Test Cases Page', async () => {
      await homePage.landedOn();
      await homePage.filterCategory('Women', 'Dress');
      await homePage.filterCategory('Men', 'Jeans');
      await homePage.filterCategory('Women', 'Tops');
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
