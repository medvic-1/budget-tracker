const test = require('node:test');
const assert = require('node:assert');
const { addTransaction } = require('./app.js');

// --- 1. Unit Test: Asserts behavior of underlying logic ---
test('unit: addTransaction creates a valid transaction object with correct properties', () => {
  const mockStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = value; }
  };

  const result = addTransaction('Coffee', 4.50, mockStorage);
  
  assert.strictEqual(result.title, 'Coffee');
  assert.strictEqual(result.amount, 4.50);
  assert.ok(result.id, 'Transaction should have a unique ID');
});

// --- 2. Acceptance Test: Exercises the thin slice at the storage boundary ---
test('acceptance: user can record a transaction and it persists in storage', () => {
  const mockStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = value; }
  };

  // Simulate user submitting a form for Rent
  addTransaction('Rent', 1200, mockStorage);

  // Verify it saved and can be retrieved like the app does
  const savedData = JSON.parse(mockStorage.getItem('transactions'));
  assert.strictEqual(savedData.length, 1);
  assert.strictEqual(savedData[0].title, 'Rent');
  assert.strictEqual(savedData[0].amount, 1200);
});
