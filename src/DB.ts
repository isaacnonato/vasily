import fs from 'fs';
class DB {
  path: string = './';
  data = fs.readFileSync(this.path).toString();

  constructor() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, this.data);
    }
  }
}
