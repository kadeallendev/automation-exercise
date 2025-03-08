import { expect, test } from '@playwright/test';

test('Test Case', async ({ page }) => {
  const baseURL = 'https://www.automationexercise.com/';
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);
  // Record after this line
  //
  await expect(page.getByRole('heading', { name: 'recommended items' })).toBeVisible();
  await page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();
  await page.getByRole('link', { name: 'View Cart' }).click();
});
