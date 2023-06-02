import { Application } from 'express';
import DB from './DB.ts';
import Entry from './Entry.ts';
import { genid } from '../utils/genid.ts';
import { nanoid } from 'nanoid';

export default class VasilyInstance {
  express: Application;
  storage: DB = new DB();
  constructor(express: Application) {
    this.express = express;

    express.get('/', () => {
      this.storage.write(
        new Entry(undefined, 'uri3', undefined, 'h', 0),
        'yJRhm'
      );
    });
  }
  run(port: number = 4001, host: string = '127.0.0.1') {
    this.express.listen(port, host, () => {
      console.log(`listening to ${host}:${port}`);
    });
  }
}
