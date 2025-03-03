import { expect, test } from '@playwright/test';

test('Test Case', async ({ page }) => {
  const baseURL = 'https://www.automationexercise.com/';
  await page.goto(baseURL);
  await expect(page).toHaveURL(baseURL);
  // Record after this line
  await page.locator('div:nth-child(2) > div:nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('tester');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('tester@test.com');
  await page.locator('form').filter({ hasText: 'Email Address already exist!' }).getByPlaceholder('Email Address').fill('teste3r@test.com');
  await page.getByRole('button', { name: 'Signup' }).click();
  await page.getByRole('textbox', { name: 'Password *' }).fill('tester');
  await page.getByRole('textbox', { name: 'First name *' }).fill('test');
  await page.getByRole('textbox', { name: 'Last name *' }).fill('test');
  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('test');
  await page.getByRole('textbox', { name: 'State *' }).fill('te');
  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('tere');
  await page.locator('#zipcode').fill('12131');
  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('12234242');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await expect(page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
  await expect(page.locator('#address_delivery')).toContainText('. test test');
  await expect(page.locator('tbody')).toContainText('Rs. 400');
  await page.getByRole('link', { name: 'Summer White Top' }).click({
    button: 'right'
  });
  await expect(page.locator('#product-6')).toContainText('Summer White Top');
  await page.locator('textarea[name="message"]').fill('leave by front door');
  await page.getByRole('link', { name: 'Place Order' }).click();
  await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  await page.locator('input[name="name_on_card"]').fill('teste');
  await page.locator('div').filter({ hasText: 'Name on Card Card Number CVC' }).nth(2).click();
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill('1231131313');
  await page.getByRole('textbox', { name: 'ex.' }).fill('131');
  await page.getByRole('textbox', { name: 'MM' }).fill('12');
  await page.getByRole('textbox', { name: 'YYYY' }).fill('2065');
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  await expect(page.getByText('Order Placed!')).toBeVisible();
  await expect(page.getByText('Congratulations! Your order')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: 'Continue' }).click();
});
