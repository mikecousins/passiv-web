[![Build Status](https://travis-ci.org/passiv/passiv-web.svg?branch=master)](https://travis-ci.org/passiv/passiv-web)
[![dependencies Status](https://david-dm.org/passiv/passiv-web/status.svg)](https://david-dm.org/passiv/passiv-web)
[![devDependencies Status](https://david-dm.org/passiv/passiv-web/dev-status.svg)](https://david-dm.org/passiv/passiv-web?type=dev)

## Table of Contents

- [Introduction](#introduction)
- [Major Components](#major-components)
- [Getting Started](#getting-started)
- [Infrastructure](#infrastructure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)

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


## Getting Started

You'll need a bunch of environment setup done before getting started with our application.

* [NodeJS](https://nodejs.org/)
* Package Manager either NPM which comes with Node or [Yarn](https://yarnpkg.com/)
* Text Editor like [VS Code](https://code.visualstudio.com/)
* Git Client (some editors have them already, or you can install it for the [command line](https://git-scm.com/))

You'll want to clone the repo and then in your terminal run:

### `yarn` or `npm install`

This will take a bit and will install all of our libraries. When it's done run:

### `yarn start` or `npm start`

This will build and launch the app in your browser.

## Infrastructure

We build our app using [Travis](https://travis-ci.org/passiv/passiv-web).

We deploy our app on [Netlify](https://netlify.com).

We monitor our dependencies using [David](https://david-dm.org/passiv/passiv-web).

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
