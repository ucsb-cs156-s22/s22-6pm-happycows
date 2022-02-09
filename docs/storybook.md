# Storybook Setup

When setting up a repo that uses this repo as starter code, at first you may get
failures of the GitHub Actions scripts that set up and update the Storybook.

This file describes the one-time setup steps necessary to get that working.

## Setting up the repos

First, you'll need to set up two repos that have the same name as this repo, in the same organization, but with these suffixes:

* `-docs`
* `-docs-qa`

For example, for `demo-spring-react-example`, you set up:

* `demo-spring-react-example-docs`, which is updated when changes are merged to the main branch
* `demo-spring-react-example-docs-qa`, which is updated each time a pull request to the main branch is made

Note that the contents of the qa repo will reflect the *most recent* push to a branch that has an open pull-request, so if there are multiple pull requests,
it may be ambiguous.  Future work might include creating separate directories under the docs-qa folder with names for each branch, and a job that deletes these when these branches are merged to `main`.

## Enable GitHub Pages in the docs repos

Then, for each of those repos, visit the repo settings and go to Pages.

Enable GitHub Pages on the `main` branch, in the `docs` folder for each repo.

That looks like this:

![image](https://user-images.githubusercontent.com/1119017/151077121-693321a9-5684-40c5-a20f-2cb111881066.png)

Note that the `main` branch and the `docs/` folder must exist before you can do this.  If necessary, you can use the GitHub web interface to
first create an empty `README.md` to establish the `main` branch, then create an empty file called `docs/.keep` on the main branch to establish the
`docs/` folder.

## Setting up a Personal Access Token for GitHub Actions

The GitHub actions script to deploy the Storybook to QA requires that a repository secret called `DOCS_TOKEN` be set up; this should be an access token for the repository.   This secret can be obtained by visiting the settings page for either the organization, or a user with access to the organization, visiting Developer Settings, and then Personal Access Tokens. 

![image](https://user-images.githubusercontent.com/1119017/147836507-0190801c-ce94-4e5a-9abe-6a1d2d0455af.png)

Copy the personal access token value, then visit the Settings for this repo, and add a repository secret called `DOCS_TOKEN` and paste in the Personal Access Token value.

## Update the links in the README.md

Finally, at the top of the README.md there shoudl be two links for the Storybook that look like this:

```
Storybook is here:

Production: https://ucsb-cs156-w22.github.io/demo-spring-react-example-docs/
QA: https://ucsb-cs156-w22.github.io/demo-spring-react-example-docs-qa/
```

Each of the URLs has this form:

```
https://ORGANIZATION_NAME.github.io/REPO-NAME-docs/
https://ORGANIZATION_NAME.github.io/REPO-NAME-docs-qa/

```
