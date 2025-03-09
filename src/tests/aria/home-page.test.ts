import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom';

test.describe('Home Page ARIA Regression', () => {
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
    await test.step('Cleanup Test Data', async () => {
      await homePage.getPage().close();
    });
  });
});
