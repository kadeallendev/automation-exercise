import { type Page, expect } from '@playwright/test';

export class PaymentDonePage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Order Placed/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/payment_done\/\d+/i;
    this.baseURL = 'https://automationexercise.com/payment_done';
  }
  async navigateTo(index: number): Promise<void> {
    const url = `${this.baseURL}/${index}`;
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURLPattern);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
  async checkOrderPlaced(): Promise<void> {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
    await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();
  }
  async clickContinue(): Promise<void> {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
}
export default { PaymentDonePage };
