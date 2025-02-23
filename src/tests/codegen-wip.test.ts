import { expect, test } from '@playwright/test';

test('Test Case 8', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  await page.getByRole('link', { name: ' Products' }).click();
  await expect(page.locator('body')).toContainText('All Products');
  await expect(page.locator('body')).toContainText('Blue Top');
  await page.locator('.choose > .nav > li > a').first().click();
  await expect(page.locator('section')).toContainText('Blue Top');
  await expect(page.locator('section')).toContainText('Category: Women > Tops');
  await expect(page.locator('section')).toContainText('Rs. 500');
  await expect(page.locator('section')).toContainText('Availability: In Stock');
  await expect(page.locator('section')).toContainText('Condition: New');
  await expect(page.locator('section')).toContainText('Brand: Polo');
  await page.getByRole('link', { name: ' Products' }).click();

  // Need to look at a product object to make test more dynamic
  // now a product has
  // - name
  // - category
  // - price
  // - availability
  // - condition
  // - brand
  // Now some display text is hardcoded in the test
  // - 'Category
  // - 'Availability
  // - 'Condition
  // - 'Brand
  // - 'Rs.
  // which could be added to the product object
  // - categoryDisplayText
  // - availabilityDisplayText
  // - conditionDisplayText
  // - brandDisplayText
  // - priceDisplayText
});
