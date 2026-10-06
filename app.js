function addTransaction(title, amount, storage = localStorage) {
  const transactions = JSON.parse(storage.getItem('transactions') || '[]');
  const newTransaction = { id: Date.now().toString(), title, amount: parseFloat(amount) };
  transactions.push(newTransaction);
  storage.setItem('transactions', JSON.stringify(transactions));
  return newTransaction;
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('transaction-form');
  const list = document.getElementById('transaction-list');

  function render() {
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    list.innerHTML = transactions.map(t => `<li>${t.title}: $${t.amount}</li>`).join('');
  }

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

if (typeof module !== 'undefined') module.exports = { addTransaction };
