import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import { BasePage } from './base-page';

export class ProductDetailsPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;
  private section: Locator;
  private quantityInput: Locator;
  private continueShoppingButton: Locator;
  private viewCartLink: Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Product Details/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/product_details\/\d+/i;
    this.baseURL = 'https://automationexercise.com/product_details/';
    this.section = this.page.locator('section');
    this.quantityInput = this.page.locator('#quantity');
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
    this.addToCartButton = this.page.getByRole('button', { name: ' Add to cart' });
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

  async checkProductDetailsForProduct(testProduct: ProductData.ProductData): Promise<void> {
    await expect(this.section).toContainText(testProduct.product.name);
    await expect(this.section).toContainText(testProduct.categoryDisplayText);
    await expect(this.section).toContainText(testProduct.priceDisplayText);
    await expect(this.section).toContainText(testProduct.availabilityDisplayText);
    await expect(this.section).toContainText(testProduct.conditionDisplayText);
    await expect(this.section).toContainText(testProduct.brandDisplayText);
  }

  async setQuantity(testProduct: ProductData.ProductData): Promise<void> {
    const quantity = String(testProduct.product.quantity);
    await this.quantityInput.fill(quantity);
    await expect(this.quantityInput).toHaveValue(quantity);
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async clickViewCart(): Promise<void> {
    await this.viewCartLink.click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }
}

export default { ProductDetailsPage };
