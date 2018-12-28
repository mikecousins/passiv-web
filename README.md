[![Build Status](https://travis-ci.org/passiv/passiv-web.svg?branch=master)](https://travis-ci.org/passiv/passiv-web)
[![dependencies Status](https://david-dm.org/passiv/passiv-web/status.svg)](https://david-dm.org/passiv/passiv-web)
[![devDependencies Status](https://david-dm.org/passiv/passiv-web/dev-status.svg)](https://david-dm.org/passiv/passiv-web?type=dev)

## Table of Contents

- [Introduction](#introduction)
- [Major Components](#major-components)
- [Getting Started](#getting-started)
  - [VS Code Setup](#vs-code-setup)
- [Infrastructure](#infrastructure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
- [Tests](#tests)
  - [Unit](#unit-tests)
  - [System](#system-tests)

## Introduction

This is the front-end app for [Passiv](https://getpassiv.com). We're big proponents of open source software and would love for people to audit our code for security reasons so we've made this fully available on Github. Follow along with us as we try to change the face of investing.

## Major Components

This app was developed using quite a few libraries which we're incredibly thankful for.

* [React](https://reactjs.org/)
* [Create React App](https://github.com/facebook/create-react-app)
* [Redux](https://redux.js.org/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Formik](https://github.com/jaredpalmer/formik)
* [Font Awesome](https://fontawesome.com/)
* [Emotion](https://emotion.sh)
* [Storybook](https://storybook.js.org/)
* [date-fns](https://date-fns.org/)
* [Downshift](https://github.com/paypal/downshift)
* [Cypress](https://cypress.io)
* [Enzyme](https://airbnb.io/enzyme/)
* [Jest](https://jestjs.io/)

## Getting Started

You'll need a bunch of environment setup done before getting started with our application.

* [NodeJS](https://nodejs.org/)
* Package Manager either NPM which comes with Node or [Yarn](https://yarnpkg.com/)
* Text Editor like [VS Code](https://code.visualstudio.com/)
* Git Client (some editors have them already, or you can install it for the [command line](https://git-scm.com/))

You'll want to clone the repo and then in your terminal run:

`yarn` or `npm install`

This will take a bit and will install all of our libraries. When it's done run:

`yarn start` or `npm start`

This will build and launch the app in your browser.

### VS Code Setup

If you're using Visual Studio Code, here are some tips for getting it setup perfectly for our code.

You'll want the following extensions:

* **EditorConfig for VS Code** - uses our built-in config file to setup VS Code for line endings, tab size, etc.
* **ESLint** - shows you any problems with your code in real-time
* **Jest** - runs our unit tests while you code, giving you great feedback
* **GitLens** - enables nice Git integration
* **VS Live Share** - so you can pair program with ease

## Infrastructure

At Passiv we stand on the shoulders of giants to provide you with a reliable, world-class product.

We build our app using [Travis](https://travis-ci.org/passiv/passiv-web).

We deploy our app on [Netlify](https://netlify.com).

We monitor our dependencies using [David](https://david-dm.org/passiv/passiv-web).

We monitor exceptions using [Sentry](https://sentry.io).

We track usage with [Google Analytics](https://analytics.google.com).

We host our code on [GitHub](https://github.com).

We process payments with [Stripe](https://stripe.com).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Tests

We believe in well tested code and as such have a rigorous suite of both unit and system tests.

### Unit Tests

We use Jest/Enzyme for our unit tests. They are located in a `/tests` folder inside each component folder.

### System Tests

We use Cypress for our system tests. They are located in the `/cypress/fixtures` folder.
