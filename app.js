function addTransaction(title, amount, storage = localStorage) {
  const transactions = JSON.parse(storage.getItem('transactions')) || [];
  const newTransaction = { id: Date.now().toString(), title, amount: parseFloat(amount) };
  transactions.push(newTransaction);
  storage.setItem('transactions', JSON.stringify(transactions));
  return newTransaction;
}

function deleteTransaction(id, storage = localStorage) {
  let transactions = JSON.parse(storage.getItem('transactions')) || [];
  transactions = transactions.filter(t => t.id !== id);
  storage.setItem('transactions', JSON.stringify(transactions));
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
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Calculate metrics
    const total = calculateTotal(transactions);
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

    // Update Card Values
    if (totalBalanceEl) totalBalanceEl.textContent = `$${total.toFixed(2)}`;
    if (totalIncomeEl) totalIncomeEl.textContent = `$${income.toFixed(2)}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `$${expenses.toFixed(2)}`;

    // Render Transaction List items with color coding and a delete button
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
              <button onclick="removeTransaction('${t.id}')" style="background: var(--red); padding: 4px 10px; font-size: 0.8rem; border-radius: 6px;">✕</button>
            </div>
          </li>
        `;
      }).join('');
    }
  }

  // Global function for the delete button click
  window.removeTransaction = function(id) {
    deleteTransaction(id);
    render();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    addTransaction(title, amount);
    render();
    form.reset();
  });

  render();
}

if (typeof module !== 'undefined') module.exports = { addTransaction, deleteTransaction, calculateTotal };
