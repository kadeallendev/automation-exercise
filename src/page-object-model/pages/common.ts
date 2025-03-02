import type { Page } from '@playwright/test';

export async function blockAds(page: Page): Promise<void> {
  await page.route('**/*', (request) => {
    request.request().url().startsWith('https://googleads.') ? request.abort() : request.continue();
    return;
  });
}
