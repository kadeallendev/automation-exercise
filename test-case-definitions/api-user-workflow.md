# Test Case ID: API-User-Workflow

## Test Case Name: User Workflow API Test

### Test Objective

Verify that the user workflow API can create a user, verify their login, and delete the user if they exist.

---

### Preconditions

1. The API server is running and accessible.
2. The `BASE_URL` environment variable is correctly configured.
3. The user data used for account creation is unique and valid.

---

### Test Steps

#### Test Case: Create User and Verify Login

1. Generate a new user using the `UserData.createUser()` method.
2. Use the `CreateUserIfNotExists` workflow to ensure the user is created if they do not already exist.
3. Verify that the user is created successfully.
4. Use the `VerifyUserExists` workflow to confirm that the user exists in the system.

#### Test Case: Cleanup - Delete User

1. Use the `DeleteUserIfExists` workflow to delete the user if they exist.
2. Verify that the user is deleted successfully.

---

### Post Conditions

1. Ensure that the created user account is deleted after the test execution.
2. Close any open API request contexts.

---

### Expected Results

1. The user is successfully created if they do not already exist.
2. The user's existence is verified in the system.
3. The user is successfully deleted after the test execution.

---

### Tags

@api, @API-User-Workflow

---

[Back to Index](test-case-index.md)
