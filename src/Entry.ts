import crypto from 'crypto';
import fs from 'fs';
import genid from '../utils/genid';

class Entry {
  id: string;
  URI: string;
  createdAt: number;
  password?: string;
  hash?: string;

  constructor(
    id = genid(),
    URI,
    password,
    hash = password ? Entry.hash(password) : undefined,
    createdAt = Date.now()
  ) {
    this.id = id;
    this.password = password;
    this.URI = URI;
    this.hash = hash;
    this.createdAt = createdAt;
  }
  static hash(password): string {
    let hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  verifyPassword(password): boolean {
    return this.hash === Entry.hash(password);
  }

  serialize(): string {
    return `${this.id};${this.URI};${this.hash};${this.createdAt}`;
  }

  parse(data): Entry[] {
    const content: string[] = data.split('/n');
    let parsedData: Entry[] = [];

    for (let index in content) {
      const [id, URI, hash, createdAt] = content[index].split(';');
      parsedData.push(new Entry(id, URI, undefined, hash, parseInt(createdAt)));
    }
    return parsedData;
  }
}
