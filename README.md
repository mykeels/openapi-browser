# openapi-browser

Edit your [Open API specification](https://github.com/OAI/OpenAPI-Specification) in your text editor and view the rendered spec in real time (hot reload) in your browser.

openapi-browser renders your spec in [Swagger UI](https://github.com/swagger-api/swagger-ui), provided by [swagger-ui-dist](https://www.npmjs.com/package/swagger-ui-dist).

## Installation

In a new or existing folder containing your project:

```
npm install openapi-browser
```

### Usage
Start openapi-browser, pointing it to your spec file:
```
npx openapi-browser --file ./openapi.yaml
```

This will open your browser to localhost:30303 with your spec loaded into Swagger UI. You can override the port by passing in a `--port`, and you can pass the `--silent` option if you don't want the browser window to be automatically opened.


You can also call the package from JavaScript:

```javascript
const openApiBrowser = require('openapi-browser');

const options = {
  file: './src/api/v1/api.yaml', // specify relative or absolute path
  port: 10021, // specify port or omit to use default (30303)
  silent: false, // invoque browser or run silently
};

openApiBrowser.edit(options);
```

## Licence

This project is licensed under the MIT License

## Development Setup

- Clone this repo: `git clone https://github.com/mykeels/openapi-browser`.

- Install dependencies: `npm install`

- `npm run build` or `npm run build:watch` to build the project.

- `npm test` to run tests (`npm run test:watch` to run in watch mode).

## Contributing

Keep it simple. Keep it minimal.

## Credits

Huge props to [openapi-editor](https://github.com/Codermar/openapi-editor). 🙌
