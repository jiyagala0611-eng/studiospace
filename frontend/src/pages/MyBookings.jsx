import { useState } from 'react';
import { getBookings, cancelBooking } from '../api.js';

export default function MyBookings() {
  const [email, setEmail] = useState('');
  const [list, setList] = useState(null);
  const [error, setError] = useState('');

  async function find(e) {
    e.preventDefault();
    setError('');
    try { setList(await getBookings(email)); } catch (err) { setError(err.message); }
  }

  async function cancel(id) {
    await cancelBooking(id);
    setList((l) => l.filter((b) => b._id !== id));
  }

  return (
    <section className="wrap narrow">
      <h1 className="page-title">My bookings</h1>
      <form className="row" onSubmit={find}>
        <input required type="email" placeholder="Email used while booking" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn" type="submit">Find bookings</button>
      </form>
      {error && <p className="error">{error}</p>}
      {list && list.length === 0 && <p className="muted">No bookings found for this email.</p>}
      {list && list.map((b) => (
        <div className="booking" key={b._id}>
          <div>
            <strong>{b.studio?.name || 'Studio removed'}</strong>
            <p className="muted">{b.date}, {b.startHour}:00 to {b.startHour + b.hours}:00 · ₹{b.totalPrice}</p>
          </div>
          <button className="btn ghost" onClick={() => cancel(b._id)}>Cancel booking</button>
        </div>
      ))}
    </section>
  );
}
