import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Studios from './pages/Studios.jsx';
import StudioDetail from './pages/StudioDetail.jsx';
import MyBookings from './pages/MyBookings.jsx';

export default function App() {
  return (
    <>
      <header className="nav">
        <Link to="/" className="logo">StudioSpace</Link>
        <nav>
          <NavLink to="/studios">Studios</NavLink>
          <NavLink to="/bookings">My bookings</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/studios/:id" element={<StudioDetail />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="*" element={<p className="wrap">Page not found.</p>} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} StudioSpace. Rooms for people who make things.</footer>
    </>
  );
}
