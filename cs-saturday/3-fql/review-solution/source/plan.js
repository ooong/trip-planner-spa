function intersect (arrA, arrB) {
  const intersected = [];
  for (const id of arrA) {
    if (arrB.includes(id)) {
      intersected.push(id);
    }
  }
  return intersected;
}

class Plan {
  copy () {
    const copiedPlan = new Plan();
    return Object.assign(copiedPlan, this);
  }
  setLimit (amount) {
    this._limit = amount;
    return this;
  }
  withinLimit (rows) {
    if (!this.hasOwnProperty('_limit')) return true;
    return rows.length < this._limit;
  }
  setSelected (columns) {
    if (columns.includes('*')) delete this._selected;
    else this._selected = columns;
    return this;
  }
  selectColumns (row) {
    if (!this.hasOwnProperty('_selected')) return row;
    const selectedRow = {};
    for (const column of this._selected) {
      selectedRow[column] = row[column];
    }
    return selectedRow;
  }
  setCriteria (criteria, table) {
    if (table === undefined) {
      this._nonIndexedCriteria = criteria;
      return this;
    }
    const indexedCriteria = {};
    const nonIndexedCriteria = {};
    for (const column of Object.keys(criteria)) {
      if (table.hasIndexTable(column)) {
        indexedCriteria[column] = criteria[column];
      } else {
        nonIndexedCriteria[column] = criteria[column];
      }
    }
    this._nonIndexedCriteria = nonIndexedCriteria;
    this._indexedCriteria = indexedCriteria
    return this;
  }
  matchesRow (row) {
    if (!this.hasOwnProperty('_nonIndexedCriteria')) return true;
    return Object.keys(this._nonIndexedCriteria).every((column) => {
      const val = row[column];
      const cond = this._nonIndexedCriteria[column];
      if (typeof cond === 'function') {
        return cond(val);
      } else {
        return cond === val;
      }
    });
  }
  getInitialRowIds (table) {
    if (!this.hasOwnProperty('_indexedCriteria') || Object.keys(this._indexedCriteria).length === 0) {
      return table.getRowIds();
    }
    const allRowIds = Object.keys(this._indexedCriteria)
    .map((column) => {
      const indexTable = table.getIndexTable(column);
      const indexKey = this._indexedCriteria[column];
      return indexTable[indexKey];
    });
    return allRowIds.reduce(intersect);
  }
}

module.exports = Plan;
