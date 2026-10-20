const router = require('express').Router();
const { load, save, newId } = require('../db');

const TYPES = ['photo', 'music', 'podcast', 'dance'];

// GET /api/studios?type=music
router.get('/', (req, res) => {
  const { studios } = load();
  res.json(req.query.type ? studios.filter((s) => s.type === req.query.type) : studios);
});

router.get('/:id', (req, res) => {
  const studio = load().studios.find((s) => s._id === req.params.id);
  if (!studio) return res.status(404).json({ message: 'Studio not found' });
  res.json(studio);
});

router.post('/', (req, res) => {
  const { name, type, city, pricePerHour, capacity, description, amenities } = req.body;
  if (!name || !city || !pricePerHour || !TYPES.includes(type))
    return res.status(400).json({ message: 'name, city, pricePerHour and a valid type are required' });
  const db = load();
  const studio = { _id: newId(), name, type, city, pricePerHour: Number(pricePerHour),
    capacity: capacity || 4, description: description || '', amenities: amenities || [] };
  db.studios.push(studio);
  save(db);
  res.status(201).json(studio);
});

module.exports = router;
