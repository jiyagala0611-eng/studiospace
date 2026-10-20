// All backend calls live here. Vite proxies /api to http://localhost:5000
const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getStudios = (type) => request(`/studios${type ? `?type=${type}` : ''}`);
export const getStudio = (id) => request(`/studios/${id}`);
export const createBooking = (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) });
export const getBookings = (email) => request(`/bookings?email=${encodeURIComponent(email)}`);
export const cancelBooking = (id) => request(`/bookings/${id}`, { method: 'DELETE' });
