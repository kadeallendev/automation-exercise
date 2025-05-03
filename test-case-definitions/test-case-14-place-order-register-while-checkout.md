# Test Case ID: TC-14

## Test Case Name: Place Order: Register While Checkout

### Test Objective

Verify that a user can register an account during the checkout process, place an order, and complete the payment successfully.

---

### Preconditions

1. The application under test is accessible.
2. At least one product is available in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Products" link to navigate to the All Products Page.
3. Verify that the All Products Page is displayed successfully.
4. Click on the desired product to navigate to its Product Detail Page.
5. Verify that the Product Detail Page is displayed successfully.
6. Set the desired quantity for the product and add it to the cart.
7. Navigate to the Cart Page and verify that the product is displayed in the cart with the correct details.
8. Click on "Proceed to Checkout" and then click on "Register/Login" to start the registration process.
9. Enter the required account information (e.g., name, email, password, address, etc.) and complete the registration.
10. Verify that the account is created successfully and the user is logged in.
11. Navigate back to the Cart Page and click on "Proceed to Checkout."
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

1. The user successfully registers an account during the checkout process.
2. The user successfully places an order and completes the payment.
3. A confirmation message is displayed indicating that the order has been placed successfully.

---

### Tags

@e2e, @TC-14

---

[Back to Index](test-case-index.md)
