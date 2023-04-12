import crypto from 'crypto';
import fs from 'fs';
class Entry {
  id: number;
  originalURI: string;
  shortenedURI: string;
  createdAt: number = Date.now();
  password?: string = undefined;
  hash?: string = this.password ? Entry.hash(this.password) : undefined;

  constructor(password, originalURI, shortenedURI) {
    this.password = password;
    this.originalURI = originalURI;
    this.shortenedURI = shortenedURI;
  }
  static hash(password) {
    let hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
  }

  verifyPassword(password) {
    return this.hash === Entry.hash(password);
  }

  write() {}
}
