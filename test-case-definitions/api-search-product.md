# Test Case ID: API-5, API-6

## Test Case Name: Search Product API Tests

### Test Objective

Verify the functionality of the Search Product API, including searching for products and handling invalid requests.

---

### Preconditions

1. The API server is running and accessible.
2. The `BASE_URL` environment variable is correctly configured.
3. At least one product matching the search criteria is available in the system.

---

### Test Steps

#### Test Case: API-5 - Search for a Product

1. Send a `POST` request to the `searchProduct` endpoint with a valid search term (e.g., "top").
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `200`.
5. Verify that the `products` field in the response body is an array.

#### Test Case: API-6 - Invalid Search Request

1. Send a `POST` request to the `searchProduct` endpoint with an empty search term.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `400`.
5. Verify that the `message` in the response body is `"Bad request, search_product parameter is missing in POST request."`.

---

### Post Conditions

1. Ensure that no persistent changes are made to the API data.
2. Close any open API request contexts.

---

### Expected Results

1. For API-5:
   - The `POST` request to the `searchProduct` endpoint with a valid search term returns a status code of `200`.
   - The `responseCode` in the response body is `200`.
   - The `products` field in the response body is an array.

2. For API-6:
   - The `POST` request to the `searchProduct` endpoint with an empty search term returns a status code of `200`.
   - The `responseCode` in the response body is `400`.
   - The `message` in the response body is `"Bad request, search_product parameter is missing in POST request."`.

---

### Tags

@api, @API-5, @API-6

---

[Back to Index](test-case-index.md)
