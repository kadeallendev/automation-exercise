# Test Case ID: API-1, API-2

## Test Case Name: Products List API Tests

### Test Objective

Verify the functionality of the Products List API, including retrieving all products and handling unsupported HTTP methods.

---

### Preconditions

1. The API server is running and accessible.
2. The `BASE_URL` environment variable is correctly configured.

---

### Test Steps

#### Test Case: API-1 - Retrieve All Products

1. Send a `GET` request to the `productsList` endpoint.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `200`.
5. Verify that the `products` field in the response body is an array.

#### Test Case: API-2 - Unsupported HTTP Method (POST)

1. Send a `POST` request to the `productsList` endpoint with an empty payload.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `405`.
5. Verify that the `message` in the response body is `"This request method is not supported."`.

---

### Post Conditions

1. Ensure that no persistent changes are made to the API data.
2. Close any open API request contexts.

---

### Expected Results

1. For API-1:
   - The `GET` request to the `productsList` endpoint returns a status code of `200`.
   - The `responseCode` in the response body is `200`.
   - The `products` field in the response body is an array.

2. For API-2:
   - The `POST` request to the `productsList` endpoint returns a status code of `200`.
   - The `responseCode` in the response body is `405`.
   - The `message` in the response body is `"This request method is not supported."`.

---

### Tags

@api, @API-1, @API-2

---

[Back to Index](test-case-index.md)
