# Test Case ID: TC-03

## Test Case Name: Login User with Incorrect Email

### Test Objective

Verify that a user cannot log in with an incorrect email and receives an appropriate error message.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Login" button to navigate to the Login Page.
3. Enter an incorrect email and the correct password in the respective fields.
4. Click the "Log In" button to submit the login form.
5. Verify that the login attempt fails and an appropriate error message is displayed.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The login attempt fails, and the user is not logged in.
2. An appropriate error message is displayed to the user.

---

### Tags

@e2e, @TC-03

---

[Back to Index](test-case-index.md)
