/* eslint-disable no-template-curly-in-string */
import {
  Configuration, PlatformApplication, Inject,
} from '@tsed/common';
import bodyParser from 'body-parser';
import cors from 'cors';
import { parse } from 'qs';
import { Application } from 'express';
import '@tsed/swagger';
import '@tsed/ajv';

const basePath = '/';

@Configuration({
  port: process.env.PORT || 3000,
  rootDir: __dirname,
  mount: {
    [basePath]: '${rootDir}/controllers/**/*.ts',
  },
  swagger: [{
    path: `${basePath}/api-docs`,
  }],
  componentsScan: [
    '${rootDir}/services/**/*.ts',
    '${rootDir}/middleware/**/**.ts',
  ],
})
export default class Server {
  @Inject()
  app!: PlatformApplication<Application>;

  $beforeRoutesInit(): void {
    this.app.getApp().set('query parser', (queryString: string): any => parse(queryString, {
      comma: true,
      allowDots: true,
      depth: 5,
    }));

    this.app
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));
  }
}
