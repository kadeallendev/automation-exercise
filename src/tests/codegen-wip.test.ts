import { expect, test } from '@playwright/test';

test('Test Case', async ({ page }) => {
  const baseURL = 'https://www.automationexercise.com/';
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);
  // Record after this line
});
