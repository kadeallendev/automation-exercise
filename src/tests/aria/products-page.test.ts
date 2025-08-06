import { expect } from '@playwright/test';
import { test } from '../../fixtures/base-pom-fixture';

test.describe('Products ARIA Regression', { tag: '@aria' }, () => {
  test('Check Products Page', async ({ homePage, productsPage }) => {
    await test.step('Navigate to Products', async () => {
      await homePage.landedOn();
      await homePage.clickProducts();
    });
    await test.step('Verify Products Page - Header ARIA Snapshot', async () => {
      await productsPage.landedOn();
      await expect(productsPage.getPage().locator('#header')).toMatchAriaSnapshot({ name: 'header.aria.yml' });
    });
    await test.step('Verify Products Page - Advertisement ARIA Snapshot', async () => {
      await expect(productsPage.getPage().locator('#advertisement')).toMatchAriaSnapshot({ name: 'advertisement.aria.yml' });
    });
    await test.step('Verify Products Page - Body ARIA Snapshot', async () => {
      await expect(productsPage.getPage().locator('body')).toMatchAriaSnapshot({
        name: 'body.aria.yml'
      });
    });
    await test.step('Verify Products Page - Footer ARIA Snapshot', async () => {
      await expect(productsPage.getPage().locator('#footer')).toMatchAriaSnapshot({ name: 'footer.aria.yml' });
    });
  });
  test.afterEach(async ({ homePage }) => {
    await test.step('Close Page', async () => {
      await homePage.getPage().close();
    });
  });
});
