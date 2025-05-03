# Test Case ID: TC-20

## Test Case Name: Search Products and Verify Cart After Login

### Test Objective

Verify that a user can search for a product, add it to the cart, log in, and confirm that the cart retains the product after login.

---

### Preconditions

1. The application under test is accessible.
2. The user account is already registered in the system.
3. At least one product is available in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Products" link to navigate to the All Products Page.
3. Verify that the All Products Page is displayed successfully.
4. Search for a product (e.g., "Summer White Top") using the search bar.
5. Verify that the search results display the correct product.
6. Click on the product to navigate to its Product Detail Page.
7. Verify that the Product Detail Page is displayed successfully.
8. Set the desired quantity for the product and add it to the cart.
9. Navigate to the Cart Page and verify that the product is displayed in the cart with the correct details.
10. Click on "Signup/Login" to navigate to the Login Page.
11. Enter the registered user's email and password to log in.
12. Verify that the user is logged in successfully and redirected to the Home Page.
13. Navigate back to the Cart Page.
14. Verify that the product is still displayed in the cart with the correct details.
15. Click on the "Home" link to navigate back to the Home Page.

---

### Post Conditions

1. Ensure that the registered user account is deleted via API if it still exists.
2. Close the browser or application session.

---

### Expected Results

1. The user successfully searches for a product and adds it to the cart.
2. The cart retains the product after the user logs in.
3. The cart displays the correct product with accurate details after login.

---

### Tags

@e2e, @TC-20

---

[Back to Index](test-case-index.md)
