import fs, { read, readFile, readFileSync } from 'fs';
import Entry from './Entry.ts';
import { nanoid } from 'nanoid';
export default class DB {
  path: string = './db';
  data: string = fs.existsSync(this.path)
    ? fs.readFileSync(this.path).toString()
    : '';

  write(entry: Entry): void {
    if (this.findEntrybyId(entry.id)) {
      console.log('error: entry already exists');
      return;
    }

    const newData = entry.serialize();
    fs.appendFileSync(this.path, newData, {});
    this.data = fs.readFileSync(this.path).toString();
  }

  findEntrybyId(id: string): Entry {
    console.log(this.data);
    let entries: Entry[] = Entry.parse(this.data);
    for (let index in entries) {
      if (entries[index].id === id) {
        return entries[index];
      }
    }
    console.error('entry not found');
    return;
  }

  constructor() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, this.data);
    }
  }
}
