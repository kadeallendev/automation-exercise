import { type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import type { UserData } from 'page-object-model/data/user-data';

export class CheckoutPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Checkout/i;
    this.baseURL = 'https://automationexercise.com/checkout';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async verifyOrderDetails(testUser: UserData.User, testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Address Details' })).toBeVisible();
    const fullName = `${testUser.firstName} ${testUser.lastName}`;
    await expect(this.page.locator('#address_delivery')).toContainText(fullName);
    await expect(this.page.locator('tbody')).toContainText(testProduct.totalDisplayText);
    await expect(this.page.locator(`#product-${testProduct.product.id}`)).toContainText(testProduct.product.name);
  }
  async fillMessage(): Promise<void> {
    await this.page.locator('textarea[name="message"]').fill('leave by front door');
  }
  async clickPlaceOrder(): Promise<void> {
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }
}
export default { CheckoutPage };
