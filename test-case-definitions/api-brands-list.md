# Test Case ID: API-3, API-4

## Test Case Name: Brands List API Tests

### Test Objective

Verify the functionality of the Brands List API, including retrieving all brands and handling unsupported HTTP methods.

---

### Preconditions

1. The API server is running and accessible.
2. The `BASE_URL` environment variable is correctly configured.

---

### Test Steps

#### Test Case: API-3 - Retrieve All Brands

1. Send a `GET` request to the `brandsList` endpoint.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `200`.
5. Verify that the `brands` field in the response body is an array.

#### Test Case: API-4 - Unsupported HTTP Method (PUT)

1. Send a `PUT` request to the `brandsList` endpoint with an empty payload.
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

1. For API-3:
   - The `GET` request to the `brandsList` endpoint returns a status code of `200`.
   - The `responseCode` in the response body is `200`.
   - The `brands` field in the response body is an array.

2. For API-4:
   - The `PUT` request to the `brandsList` endpoint returns a status code of `200`.
   - The `responseCode` in the response body is `405`.
   - The `message` in the response body is `"This request method is not supported."`.

---

### Tags

@api, @API-3, @API-4

---

[Back to Index](test-case-index.md)
