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

export function getRecentActivity(payments, expenses) {
  const recentPay = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const recentExp = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  let acts = [];
  recentPay.forEach(p => acts.push({ icon: "💰", text: `${p.name} contributed ${formatCurrency(p.amount)} on ${formatDate(p.date)}`, type: "pay", date: p.date }));
  recentExp.forEach(e => acts.push({ icon: "🛒", text: `Purchased ${e.item} — ${formatCurrency(e.amount)}`, type: "exp", date: e.date }));

  acts.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (acts.length === 0) acts = [{ icon: "✨", text: "All financial activities appear here", type: "info" }];
  return acts;
}
