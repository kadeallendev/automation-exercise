# Test Case ID: TC-24

## Test Case Name: Download Invoice After Purchase Order

### Test Objective

Verify that a user can place an order, download the invoice after the purchase, and confirm the invoice contents.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered or created during the checkout process.
3. At least one product is available in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Products" link to navigate to the All Products Page.
3. Verify that the All Products Page is displayed successfully.
4. Click on the desired product to navigate to its Product Detail Page.
5. Verify that the Product Detail Page is displayed successfully.
6. Set the desired quantity for the product and add it to the cart.
7. Navigate to the Cart Page and verify that the product is displayed in the cart with the correct details.
8. Click on "Proceed to Checkout" and register or log in if required.
9. Enter the required account information (if registering) and complete the registration process.
10. Verify that the user is logged in successfully and redirected to the Home Page.
11. Navigate back to the Cart Page and click on "Proceed to Checkout."
12. Verify the order details and fill in any additional information (e.g., message).
13. Click on "Place Order" to proceed to the payment page.
14. Enter the payment details (e.g., card owner, card number, expiry date, etc.) and confirm the payment.
15. Verify that the order is placed successfully and a confirmation message is displayed.
16. Download the invoice from the order confirmation page.
17. Verify the contents of the downloaded invoice (e.g., user name, total amount).
18. Click on "Continue" to navigate back to the Home Page.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user successfully places an order and downloads the invoice.
2. The downloaded invoice contains the correct details (e.g., user name, total amount).
3. The user successfully navigates back to the Home Page.

---

### Tags

@e2e, @TC-24

---

[Back to Index](test-case-index.md)
