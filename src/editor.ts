#!/usr/bin/env node
/**
 * index.ts
 *
 * OpenAPI Editor
 */
import path from 'path';
import fs from 'fs';
import util from 'util';
import colors from 'colors';
import express, { Request, Response, NextFunction } from 'express';
import useExpressWs from 'express-ws';
import watch from 'node-watch';
import serveStatic from 'serve-static';
import config from './util/config';
import browser from './util/browser';

export interface Options {
  file: string;
  host?: string;
  port?: string;
  silent?: boolean; // invoque browser or run silently
}

// swagger-viewer must be served from root
const SWAGGER_BROWSER_SERVE_PATH = '/';
// swagger-viewer expects to GET the file here
const SWAGGER_BROWSER_LOAD_PATH = '/oas/spec';
// map dir for UI
const SWAGGER_BROWSER_UI_PATH = '/swagger-ui';
// swagger-viewer GETs the configuration files
const SWAGGER_BROWSER_CONFIG_PATH = '/config/defaults.json';

// swagger redirect for oauth2
const SWAGGER_BROWSER_REDIRECT_PATH= '/oauth2-redirect.html';

export const edit = (options: Options): void => {
  if (!fs.existsSync(options.file)) {
    console.error(colors.red(`The OpenAPI file provided ${options.file} does not exist.`));
    return;
  }
  const app = express();
  const expressWs = useExpressWs(app);
  expressWs.app.ws('/hot-reload', (ws, req) => {
    console.log('WS opened!');
  });

  // retrieve the project swagger file for the swagger-viewer
  app.use(SWAGGER_BROWSER_LOAD_PATH, serveStatic(options.file));

  app.use(SWAGGER_BROWSER_CONFIG_PATH, (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') { return next(); }
    res.end(JSON.stringify(config.editorConfig));
  });

  //oauth2 redirection
  app.get(SWAGGER_BROWSER_REDIRECT_PATH, (req, res) => {
    res.sendFile(path.join(config.editorPath ,SWAGGER_BROWSER_REDIRECT_PATH));
  });

  // load swagger-viewer with use custom index
  app.use(SWAGGER_BROWSER_SERVE_PATH, serveStatic(path.resolve(__dirname, '..', 'src/')));
  app.use(SWAGGER_BROWSER_UI_PATH, serveStatic(config.editorPath));

  watch(options.file, { delay: 1000 }, (event, name) => {
    console.log(`${name} changed`, event);
    expressWs.getWss().clients.forEach((c: any) => {
      c.send('reload');
    });
  });

  // start viewer in browser //
  const hostname = options.host || '127.0.0.1';
  const port = Number(options.port || 30303);
  let editorUrl;

  app.listen(port, hostname, (server) => {
    editorUrl = util.format('http://%s:%d/?url=/oas/spec', hostname, port);
    const editApiUrl = util.format('http://%s:%d/oas/spec', hostname, port);
    const dontKillMessage = '- Do not terminate this process or close this window until finished editing -';

    console.log(colors.green(`*** ${config.name} ***`));

    if (!options.silent) {
      browser.open(editorUrl, (err: any) => {
        if (err) {
          console.error(err);
        }
        console.log(colors.gray(dontKillMessage));
      });
    } else {
      console.log(`Running ${config.name} server. You can make GET and PUT calls to ${editApiUrl}`);
      console.log(colors.gray(dontKillMessage));
    }
  });
};

export default edit;
