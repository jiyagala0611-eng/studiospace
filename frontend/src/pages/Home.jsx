import { Link } from 'react-router-dom';

const types = [
  { key: 'photo', label: 'Photo studios', note: 'Cycs, daylight rooms, product tables' },
  { key: 'music', label: 'Music rooms', note: 'Rehearsal rooms and vocal booths' },
  { key: 'podcast', label: 'Podcast studios', note: 'Mics, cameras and an edit desk' },
  { key: 'dance', label: 'Dance halls', note: 'Sprung floors and full mirrors' },
];

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <h1>Book the room.<br />Bring the idea.</h1>
        <p>Rent photo, music, podcast and dance studios by the hour. Pick a slot, pay for what you use, and walk in ready to work.</p>
        <Link to="/studios" className="btn">Browse studios</Link>
        <div className="strip" aria-hidden="true">
          {Array.from({ length: 14 }, (_, i) => (
            <span key={i} className={[2, 3, 4, 9, 10].includes(i) ? 'taken' : ''}>{8 + i}</span>
          ))}
        </div>
      </section>
      <section className="wrap">
        <h2>What are you making?</h2>
        <div className="grid4">
          {types.map((t) => (
            <Link key={t.key} to={`/studios?type=${t.key}`} className={`tile ${t.key}`}>
              <strong>{t.label}</strong>
              <span>{t.note}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
