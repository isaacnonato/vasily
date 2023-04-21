import { Application } from 'express';
import DB from './DB.ts';
import Entry from './Entry.ts';

export default class VasilyInstance {
  express: Application;
  constructor(express: Application, storage: DB = new DB()) {
    this.express = express;

    express.get('/', () => {
      let entry = new Entry('id', 'uri', undefined, 'hash', 0);
      storage.write(entry);
      storage.write(new Entry('id2', 'uri2', undefined, 'hash2', 1));
    });
  }

  run(port: number = 4000, host: string = '127.0.0.1') {
    this.express.listen(port, host, () => {
      // console.log(`listening to ${host}:${port}`);
    });
  }
}
