import { expect, test } from '@playwright/test';
import SearchProductHelper from 'api/search-product-helper';

test.describe('Search Product API', { tag: ['@api'] }, () => {
  let searchProductHelper: SearchProductHelper;

  test.beforeAll(async () => {
    searchProductHelper = await SearchProductHelper.create();
  });

  test.skip('should return product with status 200', { tag: '@API-5' }, async () => {
    const response = await searchProductHelper.searchForProduct('top');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBeTruthy();
  });
  test.skip('should return product with status 400', { tag: '@API-6' }, async () => {
    const response = await searchProductHelper.searchForProduct('');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(400);
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request');
  });
});
