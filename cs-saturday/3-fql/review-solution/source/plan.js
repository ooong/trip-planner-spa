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
  setCriteria (criteria) {
    this._criteria = criteria;
    return this;
  }
  matchesRow (row) {
    if (!this.hasOwnProperty('_criteria')) return true;
    return Object.keys(this._criteria).every((column) => {
      const val = row[column];
      const cond = this._criteria[column];
      if (typeof cond === 'function') {
        return cond(val);
      } else {
        return cond === val;
      }
    });
  }
}

module.exports = Plan;
