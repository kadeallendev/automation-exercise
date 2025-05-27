# Pull Request Instructions

## GitHUb ticket number preface to all feature branches and pull requests

- all feature branches should begin with a GitHub story, bug or task number `{{GH-123}}-my-feature-branch`, where `{{GH-123}}` represents our GitHub story number.
- This GitHub ticket number is required to associate work with a story, bug or task in GitHub.

## Pull Requests

- pull requests should use the repository's PULL_REQUEST_TEMPLATE.md
- all sections of the PULL_REQUEST_TEMPLATE.md should be filled in.
- pull request titles should begin `{{GH-123}}: meaningful description of change here`.  The GitHUb story number can be extracted from the feature branch name.
- pull requests should merge the current feature branch to the `main` branch of our repo if possible.
- if the `main` branch is not available, then the `master` branch would be our second choice.
