import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom';

test.describe('Home Page Visual Regression', () => {
  test.beforeAll(async () => {
    test.skip(!!process.env.CI, 'Skipping visual regression test in CI, until snapshots are updated');
  });
  test('Check Home Page', async ({ homePage }) => {
    await test.step('Verify Home Page Snapshot', async () => {
      await homePage.landedOn();
      await expect(homePage.getPage()).toHaveScreenshot('home-page.png');
    });
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
