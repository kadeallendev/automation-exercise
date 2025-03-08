import { type Locator, type Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class ContactUsPage extends BasePage {
  private pageTitleMatch: RegExp;
  private baseURL: string;
  private emailInput: Locator;
  private messageTextarea: Locator;
  private nameInput: Locator;
  private subjectInput: Locator;
  private submitButton: Locator;
  private successMessage: Locator;
  private successMessageText: string;
  private uploadFileInput: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitleMatch = /.*Automation Exercise - Contact Us/i;
    this.baseURL = `${process.env.BASE_URL}contact_us`;
    this.emailInput = this.page.getByRole('textbox', { name: 'Email', exact: true });
    this.messageTextarea = this.page.getByRole('textbox', { name: 'Your Message Here' });
    this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
    this.subjectInput = this.page.getByRole('textbox', { name: 'Subject' });
    this.submitButton = this.page.getByRole('button', { name: 'Submit' });
    this.successMessage = this.page.locator('#contact-page');
    this.successMessageText = 'Success! Your details have been submitted successfully.';
    this.uploadFileInput = this.page.locator('input[name="upload_file"]');
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await this.landedOn();
  }

  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }

  async enterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterSubject(subject: string): Promise<void> {
    await this.subjectInput.fill(subject);
  }

  async enterMessage(message: string): Promise<void> {
    await this.messageTextarea.fill(message);
  }

  async uploadFile(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadFileInput.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async clickSubmit(): Promise<void> {
    this.page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
    await this.page.waitForTimeout(2000); // FIXME: Need to wait for the dialog to appear
    await this.submitButton.click();
  }

  async checkSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toContainText(this.successMessageText);
  }
}

export default { ContactUsPage };
