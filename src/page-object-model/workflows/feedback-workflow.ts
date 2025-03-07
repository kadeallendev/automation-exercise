import test from '@playwright/test';
import { CommonData } from 'page-object-model/data/common-data';
import type { UserData } from 'page-object-model/data/user-data';
import type { ContactUsPage } from 'page-object-model/pages/contact-us';
import type { HomePage } from 'page-object-model/pages/home';

export namespace FeedbackWorkflow {
  export async function SubmitFeedback(homePage: HomePage, contactUsPage: ContactUsPage, testUser: UserData.User) {
    await test.step('Submit Feedback', async () => {
      await homePage.landedOn();
      await homePage.clickContactUs();
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
