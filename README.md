# StudioSpace

Studio rental booking site (photo, music, podcast, dance studios).
Stack: React (Vite) + Node.js/Express + JSON file database (no install needed).

## Setup
You only need Node.js 18+. Data is saved in backend/data/db.json.

### 1. Backend
```
cd backend
npm install
npm run seed     # adds sample studios
npm run dev      # http://localhost:5000
```

### 2. Frontend (new terminal)
```
cd frontend
npm install
npm run dev      # http://localhost:5173
```

## API
| Method | Route | What it does |
|---|---|---|
| GET | /api/studios?type=music | List studios (filter optional) |
| GET | /api/studios/:id | One studio |
| POST | /api/studios | Add a studio |
| POST | /api/bookings | Create booking (blocks overlapping slots) |
| GET | /api/bookings?email=x | Bookings for an email |
| DELETE | /api/bookings/:id | Cancel booking |

## Folder structure
```
backend/   server.js, models/, routes/, seed.js
frontend/  src/pages/, src/api.js, src/App.jsx, src/index.css
```
