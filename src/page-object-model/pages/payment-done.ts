import * as fs from 'node:fs';
import path from 'node:path';
import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class PaymentDonePage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;
  private congratulationsText: Locator;
  private continueButton: Locator;
  private downloadInvoiceLink: Locator;
  private orderPlacedText: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Order Placed/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/payment_done\/\d+/i;
    this.baseURL = `${process.env.BASE_URL}payment_done`;
    this.congratulationsText = this.page.getByText('Congratulations! Your order');
    this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    this.downloadInvoiceLink = this.page.getByRole('link', {
      name: 'Download Invoice'
    });
    this.orderPlacedText = this.page.getByText('Order Placed!');
  }

  async navigateTo(index: number): Promise<void> {
    const url = `${this.baseURL}/${index}`;
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 20_000
    });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURLPattern);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async checkOrderPlaced(): Promise<void> {
    await expect(this.orderPlacedText).toBeVisible();
    await expect(this.congratulationsText).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
  async downloadInvoice(): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadInvoiceLink.click();
    const download = await downloadPromise;
    const downloadPath = path.join('./test-results', download.suggestedFilename());
    await download.saveAs(downloadPath);
    return downloadPath;
  }
  async verifyInvoiceContents(filePath: string, name: string, amount: number): Promise<boolean> {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const expectedContents = `Hi ${name}, Your total purchase amount is ${amount}. Thank you`;
      return fileContents.trim() === expectedContents;
    } catch (error) {
      console.error('Error reading the file:', error);
      return false;
    }
  }
}

export default { PaymentDonePage };
