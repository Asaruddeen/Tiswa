export function getTotalCollected(payments) {
  return payments.reduce((sum, p) => sum + p.amount, 0);
}

export function getTotalSpent(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getRemainingBalance(payments, expenses) {
  return getTotalCollected(payments) - getTotalSpent(expenses);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatCurrency(amount) {
  return '₹ ' + amount.toLocaleString('en-IN');
}

export function generateId(prefix) {
  return prefix + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
}
