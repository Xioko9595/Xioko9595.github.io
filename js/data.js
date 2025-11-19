// 交易資料結構
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// 儲存到 localStorage
function saveTransactions() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
