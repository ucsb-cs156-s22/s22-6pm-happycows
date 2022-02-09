# About the `frontend` directory.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Commands

| Command           | What it does                                       |
|-------------------|----------------------------------------------------|
| `npm install`     | Run first time, and anytime `package.json` changes |
| `npm start`       | Start application on `http://localhost:3000`       |
| `npm test`        | Run tests                                          |
| `npm run build`   | Build production ready app in `build` folder       |
| `npm run coverage` |  Compute test coverage; <br /> report is in `coverage/lcov-report/index.html`  |
| `npx stryker run` | Run Mutation testing; <br /> report is in `reports/mutation/html/index.html`    |

There is more information on some of these later in the README file.

## Directory structures

| folder                   | explanation                                      |
|--------------------------|--------------------------------------------------|
| `.storybook/`            | configuration files related to Storybook         |
| `src/`                   | JavaScript source files                          |
| `src/fixtures/`          | Sample data for storybook and testing            |
| `src/main`               | Main application code                            |
| `src/main/components`    | - Reusable React Components, parts of a page     |
| `src/main/layouts`       | - Layouts for web pages                          |
| `src/main/pages`         | - React Components for top level pages           |
| `src/main/utils`         | - Plain old JS code (not react)                  |
| `src/stories/`           | Storybook stories                                |
| `src/stories/components` | - Storybook stories for components               |
| `src/stories/layouts`    | - Storybook stories for layouts                  |
| `src/stories/pages`      | - Storybook stories for pages                    |
| `src/tests`              | Tests                                            |
| `src/tests/components`   | - Tests for components                           |
| `src/tests/pages`        | - Tests for pages                                |
| `src/tests/utils`        | - Tests for utils                                |
| `src/App.js`                 | Top level routing of pages                       |
| `src/index.css`              | Main CSS file for application                    |
| `src/index.js`               | Main file for applicaiton, context for `<App />` |
| `src/reportWebVitals.js`     |                                                  |
| `src/setupTests.js`          | setup for jest testing                           |
| `.babelrc`               | Setup for Babel (transpiler for ES6 -> JS)       |
| `.env-cmdrc.json`        |                                                  |
| `.eslintignore`          | What issues will be ignored by ESLint            |
| `.gitignore`             | Specific Node/JS/React files to ignore           |
| `jsconfig.json`          | Configuration of directory structure             |
| `package-lock.json`      | Versions of node dependencies                    |
| `package.json`           | Specfication/Configuration of node project       |
| `README.md`              | This file (documentation)                        |
| `stryker.conf.json`      | Configuration of Stryker mutation testing        |


## More information on various commands

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


