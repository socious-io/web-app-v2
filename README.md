## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the app. The app pipeline is created with `‍npm`‍

```bash
npm install
```

## Build and Deployment

The app has two environments `production` and `development` and three targets.

Amplify CICD is used for our web deployment. `prod` branch is connected to our `production` environment and `main` branch is connected to our `development` environment.

#### deploying to `https://webapp2.dev.socious.io/`

```bash
git push origin main
```

#### deploying to `https://app.socious.io/`

```bash
git push origin prod
```

#### Building an iOS distribution for deployment

Prerequisite: `MacOS` and `XCode`

```bash
npm run open:ios
```

#### Building an Android distribution for deployment

Prerequisite: `Android Studio`

```bash
npm run open:android
```

---

# Project Title: Socious Web App

**Description**: Socious is a talent marketplace that makes impact work accessible and transparent. We connect purpose-driven professionals with impact organizations through AI matching. We use blockchain to make impact work traceable and reward contributions.

Problem: 94% of young people want to contribute to social causes, but only 10% are able to do so. This is because impact work is not easily accessible or transparent. They don’t see career progression, they are unsure of whether their work creates a real impact, or the salary is low in these impact jobs.

Solution: That’s why we built Socious to provide a new path for these purpose-driven professionals so that they don’t need to choose between their career and their desire to do good, because they can achieve both at the same time on Socious. And we make their impact work transparent and traceable.

---

# Guidance on how to contribute

> All contributions to this project will be released under the GNU General Public License (GPL) v3.
> By submitting a pull request or filing a bug, issue, or
> feature request, you are agreeing to comply with this waiver of copyright interest.
> Details can be found in our [LICENSE](LICENSE.md).

There are two primary ways to help:

- Using the issue tracker, and
- Changing the codebase.

## Using the issue tracker

Use the issue tracker to suggest feature requests, report bugs, and ask questions.
This is also a great way to connect with the developers of the project as well
as others who are interested in this solution.

Use the issue tracker to find ways to contribute. Find a bug or a feature, and mention in
the issue that you will take on that effort, then follow the _Changing the code-base_
guidance below.

## Changing the code-base

Generally speaking, you should fork this repository, make changes in your
own fork, and then submit a pull request. All new code should have associated
unit tests that validate implemented features and the presence or lack of defects.
Additionally, the code should follow any stylistic and architectural guidelines
the project prescribes. In the absence of such guidelines, mimic the styles
and patterns in the existing codebase.
