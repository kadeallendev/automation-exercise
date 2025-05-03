# Test Case ID: TC-21

## Test Case Name: Add Review on Product

### Test Objective

Verify that a user can navigate to a product's detail page and successfully add a review for the product.

---

### Preconditions

1. The application under test is accessible.
2. At least one product is available in the system.

---

### Test Steps

1. Navigate to the Home Page.
2. Click on the "Products" link to navigate to the All Products Page.
3. Verify that the All Products Page is displayed successfully.
4. Click on the desired product (e.g., "Blue Top") to navigate to its Product Detail Page.
5. Verify that the Product Detail Page is displayed successfully.
6. Scroll to the "Write a Review" section on the Product Detail Page.
7. Enter the reviewer's name (e.g., "John Doe").
8. Enter the reviewer's email address (e.g., "<john.doe@example.com>").
9. Write a review in the provided text area.
10. Submit the review.
11. Verify that a success message is displayed confirming that the review has been submitted.

---

### Post Conditions

1. Close the browser or application session.

---

### Expected Results

1. The user successfully navigates to the Product Detail Page.
2. The user successfully submits a review for the product.
3. A success message is displayed confirming the review submission.

---

### Tags

@e2e, @TC-21

---

[Back to Index](test-case-index.md)
