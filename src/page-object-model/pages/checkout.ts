import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import type { UserData } from 'page-object-model/data/user-data';
import { BasePage } from './base-page';

export class CheckoutPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private addressDetailsHeading: Locator;
  private deliveryAddress: Locator;
  private messageTextarea: Locator;
  private orderSummary: Locator;
  private placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Checkout/i;
    this.baseURL = `${process.env.BASE_URL}checkout`;
    this.addressDetailsHeading = this.page.getByRole('heading', { name: 'Address Details' });
    this.deliveryAddress = this.page.locator('#address_delivery');
    this.messageTextarea = this.page.locator('textarea[name="message"]');
    this.orderSummary = this.page.locator('tbody');
    this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
  }

  private productLocator(productId: number): Locator {
    return this.page.locator(`#product-${productId}`);
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async verifyOrderDetails(testUser: UserData.User, testProduct: ProductData.ProductData): Promise<void> {
    const fullName = `${testUser.firstName} ${testUser.lastName}`;
    await expect(this.addressDetailsHeading).toBeVisible();
    await expect(this.deliveryAddress).toContainText(fullName);
    await expect(this.orderSummary).toContainText(testProduct.totalDisplayText);
    await expect(this.productLocator(testProduct.product.id)).toContainText(testProduct.product.name);
  }

  async fillMessage(message: string): Promise<void> {
    await this.messageTextarea.fill(message);
  }

  async clickPlaceOrder(): Promise<void> {
    await this.placeOrderButton.click();
  }
}

export default { CheckoutPage };
