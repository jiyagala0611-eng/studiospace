import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudio, createBooking } from '../api.js';

const hoursOfDay = Array.from({ length: 14 }, (_, i) => 8 + i); // 8:00 to 21:00
const today = new Date().toISOString().slice(0, 10);

export default function StudioDetail() {
  const { id } = useParams();
  const [studio, setStudio] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', date: today, startHour: 10, hours: 2 });
  const [msg, setMsg] = useState({ ok: '', err: '' });

  useEffect(() => {
    getStudio(id).then(setStudio).catch((e) => setError(e.message));
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setMsg({ ok: '', err: '' });
    try {
      const b = await createBooking({ ...form, studio: id, startHour: Number(form.startHour), hours: Number(form.hours) });
      setMsg({ ok: `Booked for ${b.date}, ${b.startHour}:00 to ${b.startHour + b.hours}:00. Total ₹${b.totalPrice}.`, err: '' });
    } catch (err) {
      setMsg({ ok: '', err: err.message });
    }
  }

  if (error) return <p className="wrap error">{error}</p>;
  if (!studio) return <p className="wrap muted">Loading…</p>;

  return (
    <section className="wrap detail">
      <div>
        <div className={`thumb big ${studio.type}`}>{studio.type}</div>
        <h1>{studio.name}</h1>
        <p className="muted">{studio.city} · up to {studio.capacity} people</p>
        <p>{studio.description}</p>
        <h3>Included</h3>
        <ul className="amen">{studio.amenities.map((a) => <li key={a}>{a}</li>)}</ul>
      </div>

      <form className="book" onSubmit={submit}>
        <h2>₹{studio.pricePerHour}<small> / hour</small></h2>
        <label>Your name<input required value={form.name} onChange={(e) => set('name', e.target.value)} /></label>
        <label>Email<input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} /></label>
        <label>Date<input required type="date" min={today} value={form.date} onChange={(e) => set('date', e.target.value)} /></label>

        <span className="lbl">Start time</span>
        <div className="strip pick">
          {hoursOfDay.map((h) => (
            <button type="button" key={h} className={Number(form.startHour) === h ? 'on' : ''} onClick={() => set('startHour', h)}>{h}</button>
          ))}
        </div>

        <label>Duration
          <select value={form.hours} onChange={(e) => set('hours', e.target.value)}>
            {[1, 2, 3, 4, 6, 8].map((h) => <option key={h} value={h}>{h} hour{h > 1 ? 's' : ''}</option>)}
          </select>
        </label>

        <p className="total">Total: ₹{studio.pricePerHour * form.hours}</p>
        <button className="btn" type="submit">Confirm booking</button>
        {msg.ok && <p className="success">{msg.ok}</p>}
        {msg.err && <p className="error">{msg.err}</p>}
      </form>
    </section>
  );
}
