# IRA
The IRA use Express, AngularJS and Mongoose for MongoDB. The client side libraries are managed by Bower and the view engine is justhtml the render is processed in the client side powered by AngularJS.

## setting dev environment
Environment tools required to use this project:

    gem install scss_lint
    npm install -g bower gulp

After clone this project you should install the npm packages and bower packages.

    npm install
    bower install
    gulp default

To run the app you should use this command.

    npm start

## Running the test suite.

    npm test

## building and release

    gulp build

Copy the content of the *dist* folder into the prod server and install the npm packages with the *production* flag.

    npm install --production

For run with forever in a Linux environment:

    npm install -g forever
    nohup forever start index.js

Or in a Windows environment:

    npm start

To clean the local *dist* folder after deploy use:

    gulp clean:dist

# Architecture

## toolkit
Presents common functions independent of the business: validations, security, logging, etc.

## model
Defines the entities of the application, these are objects not defined by its attributes, but rather by a thread of continuity and its identity.
The business logic should be placed in this module. The approach to develop a complex application using here is Domain drive-design http://en.wikipedia.org/wiki/Domain-driven_design

## services
When an operation does not conceptually belong to any object. Following the natural contours of the problem, you can implement these operations in services.

## routes
Handles the HTTP requests. The business logic should not be placed here because this routers are attached to the HTTP protocol, it's hard to test and cannot be reused easily.
The public-api folder is public and does not need a user's session.
The api folder is a private API and need a valid user's session to use.

## public
This is all the client side content, the user can access this content freely.
The front-end is an AngularJS app using the SPA approach.
The controls folder is a collection of Angular's directives that representes a business object, i.e. the html tag <customer ng-model="customer" /> is replaced with the readonly customer profile to be displayed everywhere in the app.

## config
The config.json file is located in the root folder.

## resources
All the html to build PDFs or e-mails, or another type of media resources for server side process.

# Updating front-end packages

    bower update <package>

more info about Bower in http://bower.io/

# Changing connection string to database.
You should looking for the connectionString field in the /config.json file. An example of a connection string is: (mongodb://\<user\>:\<password\>@\<server\>:\<port\>/\<database\>?safe=true)
