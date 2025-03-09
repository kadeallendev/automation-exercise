import { test } from '../../fixtures/base-pom';

test.describe('Test Case 25-26: Verify Scrolling', { tag: ['@e2e', '@TC-25', '@TC-26'] }, () => {
  test('Verify that the page scrolls to footer and then back to header', async ({ homePage }) => {
    await test.step('Scroll to Footer and then to the Header', async () => {
      await homePage.landedOn();
      await homePage.scrollDownToFooter();
      await homePage.scrollUpToHeader();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
