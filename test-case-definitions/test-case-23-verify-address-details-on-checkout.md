# Test Case ID: TC-23

## Test Case Name: Verify Address Details on Checkout

### Test Objective

Verify that the delivery and billing address details are correctly displayed during the checkout process.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered in the system.
3. At least one product is available in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Signup/Login" link to navigate to the Login Page.
3. Enter the registered user's email and password to log in.
4. Verify that the user is logged in successfully and redirected to the Home Page.
5. Click on the "Products" link to navigate to the All Products Page.
6. Verify that the All Products Page is displayed successfully.
7. Click on the desired product to navigate to its Product Detail Page.
8. Verify that the Product Detail Page is displayed successfully.
9. Set the desired quantity for the product and add it to the cart.
10. Navigate to the Cart Page and verify that the product is displayed in the cart with the correct details.
11. Click on "Proceed to Checkout" to navigate to the Checkout Page.
12. Verify that the order details are displayed correctly.
13. Verify that the full delivery address details match the user's registered address.
14. Verify that the full billing address details match the user's registered address.
15. Navigate back to the Home Page.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user successfully logs in and adds products to the cart.
2. The delivery and billing address details are displayed correctly during checkout.
3. The user successfully navigates back to the Home Page.

---

### Tags

@e2e, @TC-23

---

[Back to Index](test-case-index.md)
