# Test Case ID: TC-01  

## Test Case Name: Register User Then Delete  

### Test Objective  

Verify that a user can successfully register and then delete their account.

---

### Preconditions  

1. The application under test is accessible.  
2. The user has not been previously registered with the same credentials.  

---

### Test Steps  

1. Navigate to the Home Page.  
2. Click on the "Login" button to navigate to the Login Page.  
3. On the Login Page, click on the "Sign Up" button to navigate to the Sign-Up Page.  
4. Fill in the required user details (e.g., name, email, password, etc.) on the Sign-Up Page.  
5. Submit the registration form to create a new account.  
6. Verify that the account creation is successful and the user is redirected to the Account Creation Confirmation Page.  
7. Navigate to the Delete Account Page.  
8. Confirm the deletion of the logged-in user account.  
9. Verify that the account deletion is successful and the user is redirected to the Home Page.  

---

### Post Conditions  

1. Ensure that the user account is deleted via API if it still exists.  
2. Close the browser or application session.  

---

### Expected Results  

1. The user account is successfully created, and the user is logged in.  
2. The user account is successfully deleted, and the user is logged out.  

---

### Tags  

@e2e, @TC-01

---

[Back to Index](test-case-index.md)
