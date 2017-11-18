const fs = require('fs');
const path = require('path');

// class syntax...
class Table {
  constructor (folderPath) {
    this._folderPath = folderPath;
  }
  read (id) {
    const filename = Table.toFilename(id);
    const filepath = path.join(this._folderPath, filename);
    if (!fs.existsSync(filepath)) return undefined;
    const contents = fs.readFileSync(filepath);
    const row = JSON.parse(contents);
    return row;
  }
  getRowIds () {
    const filenames = fs.readdirSync(this._folderPath);
    const ids = filenames.map(Table.toId);
    return ids;
  }
  static toFilename (id) {
    return id + '.json';
  }
  static toId (filename) {
    return filename.slice(0, -5);
  }
}

module.exports = Table;
