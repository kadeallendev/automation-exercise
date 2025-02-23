import test, { type Page } from '@playwright/test';
import { CommonData } from 'page-object-model/data/common-data';
import type { UserData } from 'page-object-model/data/user-data';
import { ContactUsPage } from 'page-object-model/pages/contact-us';
import { HomePage } from 'page-object-model/pages/home';

export namespace FeedbackWorkflow {
  export async function SubmitFeedback(page: Page, testUser: UserData.User) {
    let homePage: HomePage;
    let contactUsPage: ContactUsPage;

    await test.step('Submit Feedback', async () => {
      homePage = new HomePage(page);
      await homePage.landedOn();
      await homePage.clickContactUs();
      contactUsPage = new ContactUsPage(page);
      await contactUsPage.landedOn();
      await contactUsPage.enterName(testUser.userName);
      await contactUsPage.enterEmail(testUser.email);
      await contactUsPage.enterSubject(CommonData.randomSentence());
      await contactUsPage.enterMessage(CommonData.randomParagraph());
      await contactUsPage.uploadFile('../automation-exercise/src/fixtures/images/logo.png');
      await contactUsPage.clickSubmit();
      await contactUsPage.checkSuccessMessage();
      await contactUsPage.clickHome();
      await homePage.landedOn();
    });
  }
}
export default { FeedbackWorkflow };
