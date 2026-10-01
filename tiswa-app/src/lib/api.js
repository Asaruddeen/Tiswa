export const API_URL = 'https://tiswa.onrender.com/api';

// Render's free tier can take ~30-50s to wake up, so allow a long timeout.
export async function apiGet(path, timeoutMs = 60000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_URL}${path}`, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}
