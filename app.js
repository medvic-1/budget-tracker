const CATEGORY_COLORS = {
  Food: '#3b82f6',
  Rent: '#22c55e',
  Entertainment: '#eab308',
  Utilities: '#a855f7',
  Other: '#ef4444'
};

function addTransaction(title, amount, category, storage = localStorage) {
  const transactions = JSON.parse(storage.getItem('transactions')) || [];
  const newTransaction = { 
    id: Date.now().toString(), 
    title, 
    amount: parseFloat(amount), 
    category: category || 'Other' 
  };
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
  const donutBg = document.getElementById('donut-bg');
  const categoryLegend = document.getElementById('category-legend');

  function render() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // Calculate metrics
    const total = calculateTotal(transactions);
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions.filter(t => t.amount < 0);
    const totalExpensesNum = expenses.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

    // Update Card Values
    if (totalBalanceEl) totalBalanceEl.textContent = `$${total.toFixed(2)}`;
    if (totalIncomeEl) totalIncomeEl.textContent = `$${income.toFixed(2)}`;
    if (totalExpensesEl) totalExpensesEl.textContent = `$${totalExpensesNum.toFixed(2)}`;

    // Calculate Category Breakdown for Expenses
    const categoryTotals = {};
    expenses.forEach(t => {
      const cat = t.category || 'Other';
      categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(Number(t.amount));
    });

    // Build Conic Gradient & Legend
    let cumulativePercent = 0;
    let gradientStops = [];
    let legendHTML = '';

    const catKeys = Object.keys(categoryTotals);

    if (catKeys.length === 0) {
      if (donutBg) donutBg.style.background = '#334155';
      if (categoryLegend) categoryLegend.innerHTML = `<span style="color: var(--text-muted);">No expenses recorded yet.</span>`;
    } else {
      catKeys.forEach(cat => {
        const amt = categoryTotals[cat];
        const percent = (amt / totalExpensesNum) * 100;
        const start = cumulativePercent;
        const end = cumulativePercent + percent;
        cumulativePercent = end;

        const color = CATEGORY_COLORS[cat] || '#94a3b8';
        gradientStops.push(`${color} ${start}% ${end}%`);

        legendHTML += `
          <div class="legend-item">
            <div class="legend-label">
              <div class="color-dot" style="background: ${color};"></div>
              <span>${cat}</span>
            </div>
            <strong>$${amt.toFixed(2)} (${percent.toFixed(0)}%)</strong>
          </div>
        `;
      });

      if (donutBg) {
        donutBg.style.background = `conic-gradient(${gradientStops.join(', ')})`;
      }
      if (categoryLegend) {
        categoryLegend.innerHTML = legendHTML;
      }
    }

    // Render Transaction List items
    if (list) {
      list.innerHTML = transactions.map(t => {
        const isPositive = t.amount >= 0;
        const color = isPositive ? 'var(--green)' : 'var(--red)';
        const sign = isPositive ? '+' : '';
        const catBadge = !isPositive ? `<span style="font-size: 0.75rem; background: #334155; padding: 2px 6px; border-radius: 4px; color: var(--text-muted);">${t.category || 'Other'}</span>` : '';
        return `
          <li>
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <span>${t.title}</span>
              ${catBadge}
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <strong style="color: ${color};">${sign}$${Number(t.amount).toFixed(2)}</strong>
              <button onclick="removeTransaction('${t.id}')" style="background: var(--red); padding: 4px 10px; font-size: 0.8rem; border-radius: 6px;">✕</button>
            </div>
          </li>
        `;
      }).join('');
    }
  }

  window.removeTransaction = function(id) {
    deleteTransaction(id);
    render();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    addTransaction(title, amount, category);
    render();
    form.reset();
  });

  render();
}

if (typeof module !== 'undefined') module.exports = { addTransaction, deleteTransaction, calculateTotal };
