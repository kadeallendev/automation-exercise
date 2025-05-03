import { test } from '../../fixtures/base-pom-fixture';

test.describe('Test Case 07: Test Cases Page', { tag: ['@e2e', '@TC-07'] }, () => {
  test('Navigation to the Test Cases Page', async ({ homePage, testCasesPage }) => {
    await test.step('Navigate the Test Cases Page', async () => {
      await homePage.landedOn();
      await homePage.clickTestCases();
      await testCasesPage.landedOn();
      await testCasesPage.clickHome();
      await homePage.landedOn();
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
