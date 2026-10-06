const assert = require('assert');
const { test } = require('node:test');
const { addTransaction } = require('./app.js');

test('End-to-End: addTransaction saves to storage correctly', () => {
  const mockStorage = {
    data: {},
    getItem(key) { return this.data[key] || null; },
    setItem(key, val) { this.data[key] = val; }
  };

  const result = addTransaction('Groceries', '50.00', mockStorage);
  assert.strictEqual(result.title, 'Groceries');
  assert.strictEqual(result.amount, 50);
  assert.strictEqual(JSON.parse(mockStorage.getItem('transactions')).length, 1);
});
