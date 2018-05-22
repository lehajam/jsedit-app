# jsedit-app

This app allows to edit a json file with multiple keys mapping to the same value. It is meant to be straight forward to use, simply load a json file and start typing in the text box keys you wish to edit and follow the flow.  

It is currently available at the following URL: https://lehajam.github.io/jsedit-app/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploy to github pages

- Build project  
`ng build --prod --base-href "https://lehajam.github.io/jsedit-app/"`
- [Generate personal key](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
- Copy the key eg. 5243d174c19f32fd5250f02384862324d111e2fc
- Run angular-cli-ghpages :  
`ngh --repo=https://5243d174c19f32fd5250f02384862324d111e2fc@github.com/lehajam/jsedit-app.git --name="lehajam" --email=lehajam@gmail.com`
