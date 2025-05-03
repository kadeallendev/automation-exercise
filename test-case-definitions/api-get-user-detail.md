# Test Case ID: API-14

## Test Case Name: Get User Detail API Test

### Test Objective

Verify that the Get User Detail API successfully retrieves the account details of a user by their email address.

---

### Preconditions

1. The API server is running and accessible.
2. The `BASE_URL` environment variable is correctly configured.
3. A user account is created before the test execution.

---

### Test Steps

#### Test Case: Setup - Create Account

1. Generate a new user using the `UserData.createUser()` method.
2. Send a `POST` request to the `register` endpoint with the user's data.
3. Verify that the response status code is `200`.
4. Parse the response body as JSON.
5. Verify that the `responseCode` in the response body is `201`.
6. Verify that the `message` in the response body is `"User created!"`.

#### Test Case: API-14 - Get User Detail

1. Send a `GET` request to the `getUserAccountDetailByEmail` endpoint with the user's email address.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `200`.

#### Test Case: Cleanup - Delete Account

1. Send a `DELETE` request to the `deleteAccount` endpoint with the user's data.
2. Verify that the response status code is `200`.
3. Parse the response body as JSON.
4. Verify that the `responseCode` in the response body is `200`.
5. Verify that the `message` in the response body is `"Account deleted!"`.

---

### Post Conditions

1. Ensure that the created user account is deleted after the test execution.
2. Close any open API request contexts.

---

### Expected Results

1. The `POST` request to the `register` endpoint successfully creates a user account:
   - The response status code is `200`.
   - The `responseCode` in the response body is `201`.
   - The `message` in the response body is `"User created!"`.

2. The `GET` request to the `getUserAccountDetailByEmail` endpoint successfully retrieves the user's account details:
   - The response status code is `200`.
   - The `responseCode` in the response body is `200`.

3. The `DELETE` request to the `deleteAccount` endpoint successfully deletes the user account:
   - The response status code is `200`.
   - The `responseCode` in the response body is `200`.
   - The `message` in the response body is `"Account deleted!"`.

---

### Tags

@api, @API-14

---

[Back to Index](test-case-index.md)
