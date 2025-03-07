import { test } from '../fixtures/base-pom';

test.describe('Test Case 7: Test Cases Page', () => {
  test('Navigation to the Test Cases Page', async ({ homePage, testCasesPage }) => {
    await test.step('Navigate the Test Cases Page', async () => {
      await homePage.landedOn();
      await homePage.clickTestCases();
      await testCasesPage.landedOn();
      await testCasesPage.clickHome();
      await homePage.landedOn();
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
