## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the app. The app pipeline is created with ```‍npm```‍

```bash
npm install
```

## Build and Deplyment

The app has two environments `production` and `development` and three targets.

Amplyfy CICD is used for our web deployment. `prod` branch is connected to our `production` environment and `main` branch is connected to our `development` environment.

#### deploying to `https://webapp2.dev.socious.io/`
```bash
git push origin main
```

#### deploying to `https://webapp2.socious.io/`
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