# Leila's Grooming.

This is a starter project for a Grooming Service that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Screenshots
<img width="500" alt="Screen Shot 2022-11-29 at 9 45 37 AM" src="https://user-images.githubusercontent.com/67069822/206326307-62914c27-a27e-4128-888b-a731357b3e3c.png">
<img width="500" alt="Screen Shot 2022-11-29 at 9 45 37 AM" src="https://user-images.githubusercontent.com/67069822/206326425-f3391174-41fe-4292-a328-2c13bf903957.png">
<img width="500" alt="Screen Shot 2022-11-29 at 9 45 37 AM" src="https://user-images.githubusercontent.com/67069822/206326434-ff51a188-e4c1-4cf1-b563-ea2a6f65cd19.png">

## Install Prerequisites
Ensure that you have ESLint installed to your code editor. In the packate-lock.json file, make sure that you have the following line <"eslint-config-airbnb": "^18.2.1"> to configure your ESLint.

### Linting
- Once you have ESLint installed, to lint files you will click:
    - PC: Alt + Shift + F
    - Mac: Option + Shift + F

### Node Version Manager (NVM)

NVM is a utility to help you quickly install and switch between Node versions. With NVM, there is no need to manually install and uninstall versions.

Follow the Installation Steps for [NVM on GitHub](https://github.com/coreybutler/nvm-windows).

## Getting Started

1. Clone this project locally.
2. CD into the root folder
3. Run `npm install` in the root folder to install dependencies.

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
* Dog Grooming api must be running. 

* To deploy the API, clone down a copy of the API here https://github.com/aeparson/DogGroomingAPI.

* In order to deploy your own version of the api, you can follow the directions below: 
    1. Log into or create an account at https://id.heroku.com/login
    2. Create a new application by selecting the ‘New’ button, and then selecting the ‘Create new app’ option from the dropdown. 
    3. Input the URL you would like to use for the application, and then select the ‘Create app’ button once you have entered the desired name (note: this name must be unique between ALL Heroku applications)
    4. If you haven’t done so, download the Heroku CLI for your OS from here: https://devcenter.heroku.com/articles/heroku-cli
    5. Deploying the Application:
        -In a Git terminal, enter and continue through prompts in the terminal. (‘heroku login’ Note: This may pull up a login interface in your default internet browser).
        - Ensure you are on the branch you would like to deploy to Heroku, and then add the Heroku remote with the following command: 'heroku git: .' (remote -a <heroku-application-name> 
            - Note: You can verify the git remote is connected with the command ‘git remote -v ’ and verify it’s pointing git remote -v at the heroku remote application)
        - Add the files to push to the Heroku remote application running 'git add .' 
            - note: This will add all files that aren’t being ignored the .gitignore files( ). Commit the changes by running ‘ ’ Finally push the changes to Heroku running the command: git commit -m <commit-message>  ‘git push heroku <branch-to-push>:main’ .
        - If you haven’t done so already run the command to activate dynos.'heroku ps:scale web=1’ 
        - After Heroku finishes building and applying the changes, you should be able to navigate to 
        https://<heroku-application-name>.herokuapp.com and utilize the application.


## Testing
* You can run tests with coverage via `npm run test:coverage`
