# Smart Record Validation and Update System (Pet Care Visit Management)

## 1) Folder Structure

```text
Pet-Care-System/
├── backend/
│   ├── models/
│   │   └── Visit.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── RecordDisplay.js
│   │   │   ├── SearchForm.js
│   │   │   └── UpdateForm.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   └── VisitSearchPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
└── README.md
```

## 2) Backend APIs

### POST `/search`
Request:
```json
{
  "visitId": "VIS-1001",
  "ownerId": "OWN-2001"
}
```

### PUT `/update`
Request:
```json
{
  "visitId": "VIS-1001",
  "ownerId": "OWN-2001",
  "serviceType": "Dental Cleaning",
  "visitTime": "2026-04-25T10:30"
}
```

Business rule: updates only when `bookingStatus` is `CONFIRMED`.

## 3) MongoDB Schema

Implemented in `backend/models/Visit.js` with fields:
- `visitId` (String, unique)
- `ownerId` (String)
- `petName` (String)
- `serviceType` (String)
- `visitTime` (Date)
- `bookingStatus` (PENDING, CONFIRMED, COMPLETED)

## 4) Sample Data

Sample records are auto-seeded in `backend/server.js` if the collection is empty:
- VIS-1001 / OWN-2001 / CONFIRMED
- VIS-1002 / OWN-2002 / PENDING
- VIS-1003 / OWN-2003 / COMPLETED

## 5) Run Instructions

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open frontend: `http://localhost:3000`

Backend API: `http://localhost:5000`
