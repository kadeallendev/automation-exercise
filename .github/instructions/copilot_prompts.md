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

### Scenario 2 - User unable to see product in brand filter

A customer reported that the 'Blue Top' is not displayed when filtering by Brands > POLO.
Please:

1. Create a GitHub issue for this bug.
2. Create a feature branch for the investigation.
3. Write an E2E test to check if the item is visible when filtering by POLO.
4. If the bug is not reproducible, document this and create a PR to close the issue.
5. If the bug is confirmed, fix it, update the test, and create a PR referencing the issue. Follow the repository’s CONTRIBUTING.md and instructions.

### Scenario 3 - User unable to see product in category filter

A customer reported that the 'Fancy Green Top' is not displayed when filtering by Category > Women > Tops.
Please:

1. Create a GitHub issue for this bug.
2. Create a feature branch for the investigation.
3. Write an E2E test to check if the item is visible when filtering by Tops.
4. If the bug is not reproducible, document this and create a PR to close the issue.
5. If the bug is confirmed, fix it, update the test, and create a PR referencing the issue. Follow the repository’s CONTRIBUTING.md and instructions.

### DEMO Scenario 1 - User unable to see product in brand filter

A customer reported that the 'Sleeveless Dress' is not displayed when filtering by Brands > Madame.
Please:

1. Create a GitHub issue for this bug.
2. Create a feature branch for the investigation.
3. Write an E2E test to check if the item is visible when filtering by Madame.
4. If the bug is not reproducible, document this and create a PR to close the issue.
5. If the bug is confirmed, fix it, update the test, and create a PR referencing the issue. Follow the repository’s CONTRIBUTING.md and instructions.

### DEMO Scenario 2 - User unable to see product in category filter

A customer reported that the 'Sleeveless Dress' is not displayed when filtering by Category > Women > Dress.
Please:

1. Create a GitHub issue for this bug.
2. Create a feature branch for the investigation.
3. Write an E2E test to check if the item is visible when filtering by Dress.
4. If the bug is not reproducible, document this and create a PR to close the issue.
5. If the bug is confirmed, fix it, update the test, and create a PR referencing the issue. Follow the repository’s CONTRIBUTING.md and instructions.

