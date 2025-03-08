import { type Locator, type Page, expect } from '@playwright/test';
import type { ProductData } from 'page-object-model/data/product-data';
import { BasePage } from './base-page';

export class ProductDetailsPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURLPattern: RegExp;
  private baseURL: string;
  private addToCartButton: Locator;
  private quantityInput: Locator;
  private reviewLink: Locator;
  private reviewSubmittedText: string;
  private reviewerEmailInput: Locator;
  private reviewerNameInput: Locator;
  private reviewTextarea: Locator;
  private section: Locator;
  private submitReviewButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Product Details/i;
    this.baseURLPattern = /https:\/\/automationexercise\.com\/product_details\/\d+/i;
    this.baseURL = `${process.env.BASE_URL}product_details/`;
    this.addToCartButton = this.page.getByRole('button', { name: ' Add to cart' });
    this.quantityInput = this.page.locator('#quantity');
    this.reviewLink = this.page.getByRole('link', { name: 'Write Your Review' });
    this.reviewSubmittedText = 'Thank you for your review';
    this.reviewerEmailInput = this.page.getByRole('textbox', { name: 'Email Address', exact: true });
    this.reviewerNameInput = this.page.getByRole('textbox', { name: 'Your Name' });
    this.reviewTextarea = this.page.getByRole('textbox', { name: 'Add Review Here!' });
    this.section = this.page.locator('section');
    this.submitReviewButton = this.page.getByRole('button', { name: 'Submit' });
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

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async checkReviewLink(): Promise<void> {
    await expect(this.reviewLink).toBeVisible();
  }

  async enterReviewerName(name: string): Promise<void> {
    await this.reviewerNameInput.fill(name);
  }

  async enterReviewerEmail(email: string): Promise<void> {
    await this.reviewerEmailInput.fill(email);
  }

  async enterReview(review: string): Promise<void> {
    await this.reviewTextarea.fill(review);
  }

  async submitReview(): Promise<void> {
    await this.submitReviewButton.click();
  }

  async checkReviewSubmitted(): Promise<void> {
    await expect(this.section).toContainText(this.reviewSubmittedText);
  }
}

export default { ProductDetailsPage };
