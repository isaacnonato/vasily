import { Application } from 'express';
import DB from './DB.ts';
import Entry from './Entry.ts';
import { genid } from '../utils/genid.ts';
import { nanoid } from 'nanoid';

export default class VasilyInstance {
  express: Application;
  constructor(express: Application, storage: DB = new DB()) {
    this.express = express;

    express.get('/', () => {
      storage.write(new Entry(nanoid(5), 'uri', undefined, 'h', 0));
      storage.write(new Entry(nanoid(5), 'uri2', undefined, 'h', 0));
    });
  }

  run(port: number = 4000, host: string = '127.0.0.1') {
    this.express.listen(port, host, () => {
      // console.log(`listening to ${host}:${port}`);
    });
  }
}
