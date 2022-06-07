# Hotel Rentals, Inc.

This is a starter project for a Hotel Company that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install Prerequisites
Ensure that you have ESLint installed to your code editor. In the packate-lock.json file, make sure that you have the following line <"eslint-config-airbnb": "^18.2.1"> to configure your ESLint.


### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

1. Clone this project locally.
1. CD into the root folder
1. Run `npm install` in the root folder to install dependencies.

This command installs a package, and any packages that it depends on.

1. Run `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
Double check your key bindings for linting, but the standard way to lint your files is:
    -Mac: Option + Shift + F
    -PC: Alt + Shift + F

It is important to lint frequently as ESLint will cause the application not to build if you have linting errors. You can also right click on areas with red underlines to see what other errors might be there and to select to fix anything that can be auto-fixed for you.

## Dependencies
* Hotel Booking Project api must be running. The constants file has been set up to direct your code to ping off a deployed version of this api. If you have a copy and prefer to work off a local copy of the API, simply comment out the code directing to the deployed and re-initiate the line that is pointing to a local version.

## Testing
* You can run tests with coverage via `npm run test:coverage`
