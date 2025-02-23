import { type Page, expect } from '@playwright/test';

export class ContactUsPage {
  private page: Page;
  private pageTitleMatch: RegExp;
  private baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleMatch = /.*Automation Exercise - Contact Us/i;
    this.baseURL = 'https://automationexercise.com/contact_us';
  }
  async navigateTo(): Promise<void> {
    await this.page.goto(this.baseURL, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await this.landedOn();
  }
  async landedOn(): Promise<void> {
    await expect(this.page).toHaveURL(this.baseURL);
    await expect(this.page).toHaveTitle(this.pageTitleMatch);
  }
  async enterName(name: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
  }
  async enterEmail(email: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Email', exact: true }).fill(email);
  }
  async enterSubject(subject: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Subject' }).fill(subject);
  }
  async enterMessage(message: string): Promise<void> {
    await this.page.getByRole('textbox', { name: 'Your Message Here' }).fill(message);
  }
  async uploadFile(filePath: string): Promise<void> {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.page.locator('input[name="upload_file"]').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }
  async clickSubmit(): Promise<void> {
    this.page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
    });
    await this.page.waitForTimeout(2000); // FIXME: Need to wait for the dialog to appear
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
  async checkSuccessMessage(): Promise<void> {
    await expect(this.page.locator('#contact-page')).toContainText('Success! Your details have been submitted successfully.');
  }
  async clickHome(): Promise<void> {
    await this.page.getByRole('link', { name: ' Home' }).click();
  }
}
export default { ContactUsPage };
