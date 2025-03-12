import { expect, request, test } from '@playwright/test';
import BrandsListHelper from '../../api/brands-list-helper';

test.describe('Brands List API', { tag: ['@api'] }, () => {
  let brandsListHelper: BrandsListHelper;

  test.beforeAll(async () => {
    brandsListHelper = await BrandsListHelper.create();
  });

  test('should return all brands with status 200', { tag: '@API-3' }, async () => {
    const response = await brandsListHelper.getAllBrands();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.brands)).toBeTruthy();
  });
  test('should return 405 for PUT request to brandsList', { tag: '@API-4' }, async () => {
    let baseURL = `${process.env.BASE_URL}/api`;
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const requestContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: test.info().project.use.extraHTTPHeaders || {}
    });
    const url = 'brandsList';
    const fullURL = `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
    const response = await requestContext.put(fullURL, { data: {} });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });
});
