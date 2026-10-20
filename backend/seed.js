const { save, newId } = require('./db');

const studios = [
  { name: 'White Cyc Loft', type: 'photo', city: 'Mumbai', pricePerHour: 1800, capacity: 8,
    description: 'Large white cyclorama wall with natural light from the north windows.',
    amenities: ['Strobe lights', 'Backdrops', 'Changing room', 'Wi-Fi'] },
  { name: 'Daylight Portrait Room', type: 'photo', city: 'Pune', pricePerHour: 1200, capacity: 5,
    description: 'Compact room for portraits and product shoots with soft window light.',
    amenities: ['Softboxes', 'Props', 'Tea & coffee'] },
  { name: 'Reel Room A', type: 'music', city: 'Mumbai', pricePerHour: 900, capacity: 6,
    description: 'Soundproofed rehearsal room with a full backline.',
    amenities: ['Drum kit', 'Amps', 'PA system', 'AC'] },
  { name: 'Vocal Booth One', type: 'music', city: 'Delhi', pricePerHour: 1500, capacity: 3,
    description: 'Treated vocal booth with a mix desk and engineer on request.',
    amenities: ['Condenser mics', 'Monitors', 'Engineer'] },
  { name: 'Two-Chair Podcast Studio', type: 'podcast', city: 'Bengaluru', pricePerHour: 1000, capacity: 4,
    description: 'Record and edit audio or video podcasts with ready-to-use gear.',
    amenities: ['4 mics', 'Video cameras', 'Editing desk'] },
  { name: 'Mirror Hall', type: 'dance', city: 'Mumbai', pricePerHour: 700, capacity: 20,
    description: 'Sprung floor, full-length mirrors and a Bluetooth sound system.',
    amenities: ['Sprung floor', 'Mirrors', 'Speakers', 'Water cooler'] },
].map((s) => ({ _id: newId(), ...s }));

save({ studios, bookings: [] });
console.log(`Seeded ${studios.length} studios`);
