import crypto from 'crypto';
import fs from 'fs';
import { nanoid } from 'nanoid';
export default class Entry {
  id: string;
  URI: string;
  createdAt: string;
  password?: string;
  hash?: string;

  constructor(
    id,
    URI,
    password,
    createdAt = new Date().toLocaleString(),
    hash = password ? Entry.hash(password) : undefined
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
    return `${this.id};${this.URI};${this.hash};${this.createdAt}\n`;
  }

  static parse(data: string): Entry[] {
    const content: string[] = data.split('\n');
    let parsedData: Entry[] = [];

    for (let index in content) {
      const [id, URI, hash, createdAt] = content[index].split(';');
      parsedData.push(new Entry(id, URI, undefined, createdAt, hash));
    }
    return parsedData;
  }
}
