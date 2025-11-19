const form = document.getElementById('transaction-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('balance');

function updateBalance() {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);
  balanceEl.textContent = total;
  balanceEl.style.color = total >= 0 ? 'blue' : 'red';
}

function addTransaction(e) {
  e.preventDefault();
  const desc = descInput.value.trim();
  const amount = parseInt(amountInput.value);

  if (desc && !isNaN(amount)) {
    const transaction = {
      id: Date.now(),
      desc,
      amount,
      date: new Date().toISOString().slice(0,10)
    };
    transactions.push(transaction);
    saveTransactions();
    render();
    form.reset();
  }
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  render();
}

function render() {
  list.innerHTML = '';
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = t.amount > 0 ? 'income' : 'expense';
    li.innerHTML = `
      <span>${t.date} ${t.desc}</span>
      <span>${t.amount > 0 ? '+' : ''}${t.amount}</span>
      <button onclick="deleteTransaction(${t.id})">×</button>
    `;
    list.appendChild(li);
  });
  updateBalance();
}

// 綁定事件
form.addEventListener('submit', addTransaction);

// 頁面載入完成後渲染
document.addEventListener('DOMContentLoaded', render);
