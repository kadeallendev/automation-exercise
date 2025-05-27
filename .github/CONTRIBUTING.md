# Contributing to automation-exercise

Thank you for your interest in contributing!

## Getting Started

- Review the [README.md](./README.md) for repository purpose and structure.
- Read the instructions in `.github/instructions/` for standards on Playwright and GitHub Actions.
- Ensure your changes follow the folder structure and code style described in those files.

## AI/Agent Usage

- When using GitHub Copilot or other AI agents, ensure prompts reference `.github/instructions/` for repository-specific standards.
- Prefer using the "Ask/Edit/Agent" features with context from `.github/instructions/` and this file.
- If you use AI-generated code, review and adapt it to match our code style and best practices.

## Branching & Pull Requests

- All feature branches must begin with a GitHub issues number: `[GH-123]-feature-description`.
- Pull request titles must start with the GitHub issues number and a meaningful description.
- Complete all sections of the pull request template.
- Target the `main` branch unless otherwise instructed.

## Code Standards

- Use TypeScript for all supporting code in `src/`.
- Place Playwright UI tests in `src/tests/e2e/`.
- Place Playwright API tests in `src/tests/api/`.
- Follow the Page Object Model for Playwright tests.
- Ensure that test case is created/updated in `test-case-definitions/` for any test changes.

## Testing

- Validate all scripts locally before committing.
- Ensure Playwright tests pass in CI.
- Use environment variables for sensitive data.

## GitHub Actions

- Do not duplicate workflow steps; use reusable actions.
- Specify the shell for each step.
- Use consistent naming for workflows, jobs, steps, and variables.

## Questions?

Open an issue or discuss in your pull request.
