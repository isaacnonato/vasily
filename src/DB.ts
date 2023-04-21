import fs from 'fs';
import Entry from './Entry';
import e from 'express';
export default class DB {
  path: string = './db';
  data: string = fs.existsSync(this.path)
    ? fs.readFileSync(this.path).toString()
    : '';

  write(entry: Entry) {
    const newData = entry.serialize();
    console.log(this.data);
    fs.appendFile(this.path, newData, {}, (e) => {
      if (e) return e.message;
    });
  }

  constructor() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, this.data);
    }
  }
}
