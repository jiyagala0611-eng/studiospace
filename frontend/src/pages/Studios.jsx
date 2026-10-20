import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getStudios } from '../api.js';

const filters = [['', 'All'], ['photo', 'Photo'], ['music', 'Music'], ['podcast', 'Podcast'], ['dance', 'Dance']];

export default function Studios() {
  const [params, setParams] = useSearchParams();
  const type = params.get('type') || '';
  const [studios, setStudios] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    setState('loading');
    getStudios(type).then((d) => { setStudios(d); setState('done'); }).catch(() => setState('error'));
  }, [type]);

  return (
    <section className="wrap">
      <h1 className="page-title">Studios</h1>
      <div className="chips">
        {filters.map(([key, label]) => (
          <button key={key} className={type === key ? 'chip on' : 'chip'} onClick={() => setParams(key ? { type: key } : {})}>
            {label}
          </button>
        ))}
      </div>

      {state === 'loading' && <p className="muted">Loading studios…</p>}
      {state === 'error' && <p className="error">Could not reach the server. Check that the backend is running.</p>}
      {state === 'done' && studios.length === 0 && <p className="muted">No studios in this category yet.</p>}

      <div className="grid3">
        {studios.map((s) => (
          <Link key={s._id} to={`/studios/${s._id}`} className="card">
            <div className={`thumb ${s.type}`}>{s.type}</div>
            <h3>{s.name}</h3>
            <p className="muted">{s.city} · up to {s.capacity} people</p>
            <p className="price">₹{s.pricePerHour}<small> / hour</small></p>
          </Link>
        ))}
      </div>
    </section>
  );
}
