# Test Case ID: TC-16

## Test Case Name: Place Order: Login Before Checkout

### Test Objective

Verify that a registered user can log in, add products to the cart, proceed to checkout, and complete the payment successfully.

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
11. Click on "Proceed to Checkout."
12. Verify the order details and fill in any additional information (e.g., message).
13. Click on "Place Order" to proceed to the payment page.
14. Enter the payment details (e.g., card owner, card number, expiry date, etc.) and confirm the payment.
15. Verify that the order is placed successfully and a confirmation message is displayed.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user successfully logs in and adds products to the cart.
2. The user successfully places an order and completes the payment.
3. A confirmation message is displayed indicating that the order has been placed successfully.

---

### Tags

@e2e, @TC-16

---

[Back to Index](test-case-index.md)
