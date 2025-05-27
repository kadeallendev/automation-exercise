# Copilot Prompts

Use these example prompts to help Copilot focus on the tasks at hand:

- "Add a new E2E test for the login functionality."
- "Refactor the test runner configuration for better readability."
- "Update the test to use environment variables for credentials."
- "Generate a test case for failed login attempts."
- "Show only the changed lines for updating the test selector."
- "Suggest a concise way to mock API responses in tests."
- "Add comments to explain the setup steps in the test file."
- "Create a new test file for user registration scenarios."
- "Update the README with instructions for running tests locally."
- "Provide a minimal example for configuring CI workflows."

You may want to caveat your prompts with:

- "... using playwright mcp"
- "As a test automation expert with knowledge of the playwright ..."
- "if you encounter a login page, let me enter the credentials"

This will identify the specific tooling as well as focus more on the delivery.

Feel free to adapt or expand these prompts as needed for your workflow.

## Example Demo Prompt

### Scenario 1 - User unable to see product in brand filter

A customer reported that the 'Summer White Top' is not displayed when filtering by Brands > H&M.
Please:

1. Create a GitHub issue for this bug.
2. Create a feature branch for the investigation.
3. Write an E2E test to check if the item is visible when filtering by H&M.
4. If the bug is not reproducible, document this and create a PR to close the issue.
5. If the bug is confirmed, fix it, update the test, and create a PR referencing the issue. Follow the repository’s CONTRIBUTING.md and instructions.

## Best Practices for Page Object Model (POM)

- Encapsulate all page interactions and assertions within POM classes. Avoid direct access to protected properties (like `page`) from test specs.
- Expose high-level methods in POMs (e.g., `checkProductVisible(productName: string)`) for common actions or checks, so tests remain clean and focused on business logic.
- Keep selectors and UI logic inside the POM. If selectors change, only the POM needs updating.
- Use Playwright's `expect` inside POM methods for assertions, or return locators for assertions in the test if you need more flexibility.
- Prefer descriptive method names in POMs that reflect user actions or verifications (e.g., `addProductToCart`, `isProductVisible`).
- Keep your test specs readable by calling POM methods, not by duplicating UI logic or selectors.
- Document new POM methods with comments describing their purpose and usage.

Following these practices will make your tests more maintainable, readable, and robust against UI changes.
