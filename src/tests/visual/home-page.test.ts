import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Home Page Visual Regression', { tag: '@visual' }, () => {
  test.beforeAll(async () => {
    test.skip(!!process.env.CI, 'Skipping visual regression test in CI, until snapshots are updated');
  });
  test('Check Home Page', async ({ homePage }) => {
    await test.step('Verify Home Page Snapshot', async () => {
      await homePage.landedOn();
      await expect(homePage.getPage()).toHaveScreenshot('home-page.png');
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
