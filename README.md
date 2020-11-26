# openapi-browser

The **OpenAPI Browser** is a wrapper package built around the [Swagger UI](https://github.com/swagger-api/swagger-ui) tool which allows you to edit [Open API specifications](https://github.com/OAI/OpenAPI-Specification) in YAML inside your browser and preview its documentations in real time.

The OpenAPI Specification is a community-driven open specification within the [OpenAPI Initiative](https://www.openapis.org/), a Linux Foundation Collaborative Project.

**OpenAPI Browser** is built with [swagger-ui-dist](https://www.npmjs.com/package/swagger-ui-dist) which is a dependency-free module that includes everything you need to serve Swagger UI in a project.

## Features

* Hot reload.
* Runs as a stand-alone web application in a port of your choice.
* View your OpenAPI yaml/json file describing your project API.

## Getting Started

In a typical workflow of building an API based on the [Open API specifications](https://github.com/OAI/OpenAPI-Specification), you would design and model your API, write the implementation code, test it and maintain it.

### Install

In a new or existing folder containing your project:

```npm install openapi-browser```

### Usage

By default ```openapi-browser``` will run in port 30303 and will attempt to find an OpenAPI yaml file in the default path ```src/api/v1/api.yaml```

You can add an entry to the "scripts" section in package.json:

```json
"scripts": {
  "api:edit": "openapi-browser --file ./src/api/v1/api.yaml --port 10021"
}
```

You can also run it from the command line using ```npx```

```npx openapi-browser --file ./src/api/v1/api.yaml --port 10021```

Or in JavaScript by importing the module

```javascript
const openApiBrowser = require('openapi-browser');

const options = {
  file: './src/api/v1/api.yaml', // specify path as string or fully resolved path
  port: 10021, // specify port or omit for random port usage
  silent: false, // invoque browser or run silently
};

openApiBrowser.edit(options);
```

## API

### ```--file [optional]```

The OpenAPI specification File to edit. Defaults to ```src/api/v1/api.yaml```

### ```--port [optional]```

Optional port to run. Defaults to 0 or dynamically assigned port.

### ```--silent [optional true/false]```

Automatically opens default browser. Defaults to true.

## Licence

This project is licensed under the MIT License

## Development Setup

Clone this repo ```git clone https://github.com/mykeels/openapi-browser```

```npm install```

```npm run test:watch``` To run tests in watch mode.

```npm run build``` or ```npm run build:watch``` To build the project.

  `npm test` to run the tests.

## Contributing

Keep it simple. Keep it minimal.

## Credits

Huge props to [openapi-editor](https://github.com/Codermar/openapi-editor). 🙌
