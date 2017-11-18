const Plan = require('./plan');

// // how it could have worked...

// // classical inheritance (extension)
// // models the "is-a" relationship
// function FQL (folderPath) {
//   Table.call(this, folderPath);
// }

// FQL.prototype = Object.create(Table.prototype);
// FQL.prototpye.constructor = FQL;

// FQL.prototype.get = function () {
//   const rows = [];
//   const rowIds = this.getRowIds();
//   for (const id of rowIds) {
//     const row = this.read(id);
//     rows.push(row);
//   }
//   return rows;
// };

// FQL.prototype.count = function () {
//   return this.get().length;
// };

// // composition
// // models the "has-a" relationship
// function FQL (table) {
//   this._table = table;
// }

// FQL.prototype.get = function () {
//   const rows = [];
//   const rowIds = this._table.getRowIds();
//   for (const id of rowIds) {
//     const row = this._table.read(id);
//     rows.push(row);
//   }
//   return rows;
// };

// FQL.prototype.count = function () {
//   return this.get().length;
// };

// class syntax...

class FQL {
  constructor (table, plan) {
    this._table = table;
    this._plan = plan || new Plan();
  }
  get () {
    const rows = [];
    const rowIds = this._table.getRowIds();
    for (const id of rowIds) {
      if (!this._plan.withinLimit(rows)) break;
      const row = this._table.read(id);
      if (this._plan.matchesRow(row)) {
        const selectedRow = this._plan.selectColumns(row);
        rows.push(selectedRow);
      }
    }
    return rows;
  }
  count () {
    return this.get().length;
  }
  limit (amount) {
    const limitedPlan = this._plan.copy().setLimit(amount);
    return new FQL(this._table, limitedPlan);
  }
  select (...columns) {
    const selectedPlan = this._plan.copy().setSelected(columns);
    return new FQL(this._table, selectedPlan);
  }
  where (criteria) {
    const wheredPlan = this._plan.copy().setCriteria(criteria);
    return new FQL(this._table, wheredPlan);
  }
}

module.exports = FQL;
