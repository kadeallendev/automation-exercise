import { type Page, expect } from '@playwright/test';

export class PaymentPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Payment/i;
    this.baseURL = 'https://automationexercise.com/payment';
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
  async enterCardOwner(cardOwner: string): Promise<void> {
    await this.page.locator('input[name="name_on_card"]').fill(cardOwner);
  }

  async enterCardNumber(cardNumber: string): Promise<void> {
    await this.page.locator('input[name="card_number"]').fill(cardNumber);
  }
  async enterCardCvc(cardCvc: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'ex.' }).fill(cardCvc);
  }
  async enterCardExpiryMonth(expiryMonth: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'MM' }).fill(expiryMonth);
  }
  async enterCardExpiryYear(expiryYear: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill(expiryYear);
  }
  async clickPayAndConfirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }
}
export default { PaymentPage };
