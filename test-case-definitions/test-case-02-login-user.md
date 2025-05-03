# Test Case ID: TC-02

## Test Case Name: Login User with Correct Email and Password

### Test Objective

Verify that a registered user can successfully log in using the correct email and password.

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

---

### Post Conditions

1. Ensure that the user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user is successfully logged in and redirected to the Home Page or Dashboard.
2. The user account is successfully cleaned up after the test execution.

---

### Tags

@e2e, @TC-02

---

[Back to Index](test-case-index.md)
