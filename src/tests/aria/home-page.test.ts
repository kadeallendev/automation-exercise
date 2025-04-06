import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Home Page ARIA Regression', { tag: '@aria' }, () => {
  test('Check Home Page', async ({ homePage }) => {
    await test.step('Verify Home Page - Header ARIA Snapshot', async () => {
      await homePage.landedOn();
      await expect(homePage.getPage().locator('#header')).toMatchAriaSnapshot({ name: 'header.aria.yml' });
    });
    await test.step('Verify Home Page - Slider ARIA Snapshot', async () => {
      await expect(homePage.getPage().locator('#slider')).toMatchAriaSnapshot({ name: 'slider.aria.yml' });
    });
    await test.step('Verify Home Page - Body ARIA Snapshot', async () => {
      await expect(homePage.getPage().locator('body')).toMatchAriaSnapshot({ name: 'body.aria.yml' });
    });
    await test.step('Verify Home Page - Footer ARIA Snapshot', async () => {
      await expect(homePage.getPage().locator('#footer')).toMatchAriaSnapshot({ name: 'footer.aria.yml' });
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
