import fs from 'fs';
import Entry from './Entry.ts';
import { nanoid } from 'nanoid';
export default class DB {
  GLOBAL_PASSWORD: string = fs
    .readFileSync('.env', 'utf-8')
    .trim()
    .split('=')[1];
  path: string = './db';
  data: string = fs.existsSync(this.path)
    ? fs.readFileSync(this.path).toString()
    : '';

  async write(entry: Entry, id: string = this.getId()): Promise<void> {
    if (!entry.verifyPassword(this.GLOBAL_PASSWORD)) {
      console.log(this.GLOBAL_PASSWORD[0]);
      console.log('incorrect password');
      return;
    }
    entry.id = id;
    if (this.entryExists(entry.id)) {
      console.log('entry with this id already exists.');
      return;
    }
    const newData = entry.serialize();
    fs.appendFile(this.path, newData, (err) => console.error(err));
    fs.readFile(this.path, (err, data) => {
      if (err) console.error(err.message);
      this.data = data.toString();
    });
  }

  entryExists(id: string): boolean {
    return this.findEntrybyId(id)
  }

  findEntrybyId(id: string): Entry {
    let entries: Entry[] = Entry.parse(this.data);
    for (let index in entries) {
      if (entries[index].id === id) {
        return entries[index];
      }
    }
    return null;
  }

  private getId() {
    let id = nanoid(5);
    while (this.entryExists(id)) {
      id = nanoid();
    }
    return id;
  }

  constructor() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, this.data);
    }
  }
}
