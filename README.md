# Ecliptic-OS
A web-OS :)

[![Build Status](https://travis-ci.com/eclipticrick/Ecliptic-OS.svg?branch=master)](https://travis-ci.com/eclipticrick/Ecliptic-OS)

_This project uses __TypeScript__ and __SASS__ for logic and styling._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need:
* [NodeJS and NPM](https://nodejs.org/) to install the dependencies for this project


### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repo.
```
git clone https://github.com/eclipticrick/Ecliptic-OS.git ecliptic-os
```

Install the dependencies in the newly created folder

```
cd ecliptic-os
npm install
```

Run the development server locally
```
npm run start
```
Navigate to [localhost:8080](http://localhost:8080) and take a look around.

Alternatively you can go to [localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) to see the app running there, along with any log statements.

*Note: if port 8080 is in use, the server will start at port 8081*

## Running the tests

Run the tests for this project
```
npm run test
```

Keep running the tests on every file-change (for development)
```
npm run test:watch
```

## Generate a test-coverage rapport

To generate a test coverage rapport run the following command.
```
npm run test:coverage
```
This command will add a folder named `/coverage` in the root of this project. 

If you're running this project on a Windows device, you can run the following command to open the coverage rapport in your default browser.
```
npm run show:coverage
```
Alternatively you can open the coverage rapport manually by opening `/coverage/lcov-report/index.html`.

## Deployment

###### TODO: Add additional notes about how to deploy this on a live system

## Authors

* **Wesley Veenendaal** - *Initial work* - [Github page](https://github.com/eclipticrick)

See also the list of [contributors](https://github.com/eclipticrick/Ecliptic-OS/contributors) who participated in this project.

## License

###### TODO: Add a LICENCE.md file
