const fs = require('fs');
const path = require('path');

// class syntax...
class Table {
  constructor (folderPath) {
    this._folderPath = folderPath;
    this._indexTables = {};
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
  addIndexTable (column) {
    const indexTable = {};
    for (const id of this.getRowIds()) {
      const row = this.read(id);
      const indexKey = row[column];
      if (!indexTable.hasOwnProperty(indexKey)) {
        indexTable[indexKey] = [id];
      } else {
        indexTable[indexKey].push(id);
      }
    }
    this._indexTables[column] = indexTable;
  }
  getIndexTable (column) {
    return this._indexTables[column];
  }
  hasIndexTable (column) {
    return this._indexTables.hasOwnProperty(column);
  }
}

module.exports = Table;
