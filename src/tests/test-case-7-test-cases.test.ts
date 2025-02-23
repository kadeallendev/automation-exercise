import { test } from '@playwright/test';
import { HomePage } from 'page-object-model/pages/home';
import { TestCasesPage } from 'page-object-model/pages/test-cases';

test.describe('Test Case 7: Test Cases Page', () => {
  test('Navigation to the Test Cases Page', async ({ page }) => {
    await test.step('Navigate to the website', async () => {
      const homePage = new HomePage(page);
      await homePage.navigateTo();
    });
    await test.step('Navigate the Test Cases Page', async () => {
      const homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickTestCases();
      const testCasesPage = new TestCasesPage(page);
      await testCasesPage.landedOn();
      await testCasesPage.clickHome();
      await homePage.landedOn();
    });
    await test.step('Cleanup Test Data', async () => {
      page.close();
    });
  });
});
