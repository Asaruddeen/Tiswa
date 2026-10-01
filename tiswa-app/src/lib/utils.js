// Manual formatters: Hermes' Intl support differs between devices, so we avoid toLocaleString/toLocaleDateString.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getTotalCollected(payments) {
  return payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
}
export function getTotalSpent(expenses) {
  return expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
}
export function getRemainingBalance(payments, expenses) {
  return getTotalCollected(payments) - getTotalSpent(expenses);
}

// Indian digit grouping: 1,23,456
function inr(n) {
  const neg = n < 0;
  const s = String(Math.abs(Math.round(n)));
  let out;
  if (s.length <= 3) out = s;
  else out = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + s.slice(-3);
  return (neg ? '-' : '') + out;
}
export function formatCurrency(amount) {
  return '₹ ' + inr(Number(amount) || 0);
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatToday() {
  const d = new Date();
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${MONTHS_LONG[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} · ${h}:${m} ${ampm}`;
}

export function getRecentActivity(payments, expenses) {
  const recentPay = [...payments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  const recentExp = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
  let acts = [];
  recentPay.forEach((p) => acts.push({ icon: '💰', text: `${p.name} contributed ${formatCurrency(p.amount)} on ${formatDate(p.date)}`, date: p.date }));
  recentExp.forEach((e) => acts.push({ icon: '🛒', text: `Purchased ${e.item} — ${formatCurrency(e.amount)}`, date: e.date }));
  acts.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (acts.length === 0) acts = [{ icon: '✨', text: 'All financial activities appear here' }];
  return acts;
}
