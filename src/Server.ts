/* eslint-disable no-template-curly-in-string */
import { ServerLoader, ServerSettings } from '@tsed/common';
import bodyParser from 'body-parser';
import cors from 'cors';
import '@tsed/swagger';
import { parse } from 'qs';

const basePath = '/';

@ServerSettings({
  port: process.env.PORT || 3000,
  rootDir: __dirname,
  mount: {
    [basePath]: '${rootDir}/controllers/**/*.ts',
  },
  swagger: {
    path: `${basePath}${basePath.endsWith('/') ? '' : '/'}api-docs`,
  },
  componentsScan: [
    '${rootDir}/services/**/*.ts',
    '${rootDir}/middleware/**/**.ts',
  ],
})
export default class Server extends ServerLoader {
  $beforeRoutesInit(): void {
    this.set('query parser', (queryString: string): any => parse(queryString, {
      comma: true,
      allowDots: true,
      depth: 5,
    }));

    this
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));
  }
}
