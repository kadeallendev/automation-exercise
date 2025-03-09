import { test } from '../../fixtures/base-pom';

test.describe('Test Case 25-26: Verify Scrolling', () => {
  test('Verify that the page scrolls to footer and then back to header', async ({ homePage }) => {
    await test.step('Scroll to Footer and then to the Header', async () => {
      await homePage.landedOn();
      await homePage.scrollDownToFooter();
      await homePage.scrollUpToHeader();
    });

    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
