import { Application } from 'express';
import DB from './DB.ts';
import Entry from './Entry.ts';
import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';

export default class VasilyInstance {
  express: Application;
  storage: DB = new DB();
  constructor(express: Application) {
    this.express = express;
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    express.get('/create', (req, res) => {
      const entry = new Entry(nanoid(5), req.body.uri, req.body.password);
      this.storage.write(entry);
    });

    express.get('/:id', (req, res) => {
      const entry = this.storage.findEntrybyId(req.params.id);
      res.redirect('http://' + entry.URI);
    });
  }
  run(port: number = 4001, host: string = '127.0.0.1') {
    this.express.listen(port, host, () => {
      console.log(`listening to ${host}:${port}`);
    });
  }
}
