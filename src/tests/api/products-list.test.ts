import { expect, request, test } from '@playwright/test';
import ProductsListHelper from '../../api/products-list-helper';

test.describe('Products List API', { tag: ['@api'] }, () => {
  let productsListHelper: ProductsListHelper;

  test.beforeAll(async () => {
    productsListHelper = await ProductsListHelper.create();
  });

  test('should return all products with status 200', { tag: '@API-1' }, async () => {
    const response = await productsListHelper.getAllProducts();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBeTruthy();
  });
  test('should return 405 for POST request to productsList', { tag: '@API-2' }, async () => {
    let baseURL = `${process.env.BASE_URL}/api`;
    baseURL = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const requestContext = await request.newContext({
      baseURL: baseURL,
      extraHTTPHeaders: test.info().project.use.extraHTTPHeaders || {}
    });
    const url = 'productsList';
    const fullURL = `${baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
    const response = await requestContext.post(fullURL, { data: {} });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(405);
    expect(responseBody.message).toBe('This request method is not supported.');
  });
});
