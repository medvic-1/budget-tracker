// Structured Logger utility
function logEvent(level, event, correlationId, data = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    event,
    correlationId,
    ...data
  };
  // Output machine-parseable JSON log line
  console.log(JSON.stringify(logEntry));
}

function addTransaction(title, amount, storage = localStorage, correlationId = 'op-' + Math.random().toString(36.substring(2, 9))) {
  logEvent('INFO', 'ADD_TRANSACTION_INIT', correlationId, { title, rawAmount: amount });
  
  const transactions = JSON.parse(storage.getItem('transactions')) || [];
  const newTransaction = { id: Date.now().toString(), title, amount: parseFloat(amount) };
  
  transactions.push(newTransaction);
  storage.setItem('transactions', JSON.stringify(transactions));
  
  logEvent('INFO', 'STORAGE_UPDATED', correlationId, { transactionId: newTransaction.id, totalCount: transactions.length });
  return newTransaction;
}

function deleteTransaction(id, storage = localStorage, correlationId = 'op-' + Math.random().toString(36.substring(2, 9))) {
  logEvent('INFO', 'DELETE_TRANSACTION_INIT', correlationId, { targetId: id });
  
  let transactions = JSON.parse(storage.getItem('transactions')) || [];
  const initialCount = transactions.length;
  transactions = transactions.filter(t => t.id !== id);
  
  storage.setItem('transactions', JSON.stringify(transactions));
  logEvent('INFO', 'STORAGE_UPDATED', correlationId, { removedCount: initialCount - transactions.length });
}

function calculateTotal(transactions) {
  return transactions.reduce((sum, t) => sum + Number(t.amount), 0);
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('transaction-form');
  const list = document.getElementById('transaction-list');
  const totalBalanceEl = document.getElementById('total-balance');
  const totalIncomeEl = document.getElementById('total-income');
  const totalExpensesEl = document.getElementById('total-expenses');

  function render() {
    const renderTraceId = 'render-' + Math.random().toString(36).substring(2, 9);
    logEvent('DEBUG', 'UI_RENDER_START', renderTraceId);

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    const total = calculateTotal(transactions);
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(Number(t.amount), 0);

    if (totalBalanceEl) totalBalanceEl.textContent = `$${total.toFixed(2)}`;
    if (totalIncomeEl) totalIncomeEl.textContent = `$${income.toFixed(2)}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;

    if (list) {
      list.innerHTML = transactions.map(t => {
        const isPositive = t.amount >= 0;
        const color = isPositive ? 'var(--green)' : 'var(--red)';
        const sign = isPositive ? '+' : '';
        return `
          <li>
            <span>${t.title}</span>
            <div style="display: flex; align-items: center; gap: 12px;">
              <strong style="color: ${color};">${sign}$${Number(t.amount).toFixed(2)}</strong>
              <button onclick="removeTransaction('${t.id}')" style="background: var(--red); padding: 4px 10px; font-size: 0.8rem; border-radius: 6px; border: none; color: white; cursor: pointer;">✕</button>
            </div>
          </li>
        `;
      }).join('');
    }
    logEvent('DEBUG', 'UI_RENDER_COMPLETE', renderTraceId, { itemCount: transactions.length });
  }

  window.removeTransaction = function(id) {
    const deleteTraceId = 'op-del-' + Math.random().toString(36).substring(2, 9);
    deleteTransaction(id, localStorage, deleteTraceId);
    render();
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitTraceId = 'op-add-' + Math.random().toString(36).substring(2, 9);
      const title = document.getElementById('title').value;
      const amount = document.getElementById('amount').value;
      addTransaction(title, amount, localStorage, submitTraceId);
      render();
      form.reset();
    });
  }

  render();
}

if (typeof module !== 'undefined') {
  module.exports = { addTransaction, deleteTransaction, calculateTotal, logEvent };
}
