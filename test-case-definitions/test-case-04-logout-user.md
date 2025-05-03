# Test Case ID: TC-04

## Test Case Name: Logout User

### Test Objective

Verify that a logged-in user can successfully log out and then log back in.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Login" button to navigate to the Login Page.
3. Enter the registered user's email and password in the respective fields.
4. Click the "Log In" button to submit the login form.
5. Verify that the login is successful and the user is redirected to the Home Page or Dashboard.
6. Click on the "Log Out" button to log out the user.
7. Verify that the user is successfully logged out and redirected to the Login Page.
8. Log back in using the same credentials to ensure the account is still functional.
9. Verify that the login is successful and the user is redirected to the Home Page or Dashboard.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user is successfully logged in and redirected to the Home Page or Dashboard.
2. The user is successfully logged out and redirected to the Login Page.
3. The user can log back in successfully using the same credentials.

---

### Tags

@e2e, @TC-04

---

[Back to Index](test-case-index.md)
