const router = require('express').Router();
const { load, save, newId } = require('../db');

// GET /api/bookings?email=a@b.com
router.get('/', (req, res) => {
  if (!req.query.email) return res.status(400).json({ message: 'Email is required' });
  const email = req.query.email.toLowerCase().trim();
  const db = load();
  const list = db.bookings
    .filter((b) => b.email === email)
    .map((b) => {
      const s = db.studios.find((x) => x._id === b.studio);
      return { ...b, studio: s ? { _id: s._id, name: s.name, city: s.city } : null };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
  res.json(list);
});

router.post('/', (req, res) => {
  const { studio, name, email, date, startHour, hours } = req.body;
  if (!studio || !name || !email || !date || startHour == null || !hours)
    return res.status(400).json({ message: 'Please fill in all fields' });

  const db = load();
  const found = db.studios.find((s) => s._id === studio);
  if (!found) return res.status(404).json({ message: 'Studio not found' });

  // Reject overlapping slots on the same day
  const end = startHour + hours;
  const clash = db.bookings.some(
    (b) => b.studio === studio && b.date === date && startHour < b.startHour + b.hours && end > b.startHour
  );
  if (clash) return res.status(409).json({ message: 'That time is already booked. Try another slot.' });

  const booking = { _id: newId(), studio, name, email: email.toLowerCase().trim(), date,
    startHour, hours, totalPrice: found.pricePerHour * hours, createdAt: new Date().toISOString() };
  db.bookings.push(booking);
  save(db);
  res.status(201).json(booking);
});

router.delete('/:id', (req, res) => {
  const db = load();
  db.bookings = db.bookings.filter((b) => b._id !== req.params.id);
  save(db);
  res.json({ message: 'Booking cancelled' });
});

module.exports = router;
