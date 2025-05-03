# Test Case ID: TC-05

## Test Case Name: Register User with Existing Email

### Test Objective

Verify that attempting to register a user with an already registered email displays an appropriate error message.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Login" button to navigate to the Login Page.
3. On the Login Page, click on the "Sign Up" button to navigate to the Sign-Up Page.
4. Enter the same email address that is already registered in the system.
5. Fill in the remaining required user details (e.g., name, password, etc.).
6. Submit the registration form.
7. Verify that the registration attempt fails and an appropriate error message is displayed.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The registration attempt fails, and the user is not registered again.
2. An appropriate error message is displayed to the user.

---

### Tags

@e2e, @TC-05

---

[Back to Index](test-case-index.md)
