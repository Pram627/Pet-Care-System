const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Visit = require('./models/Visit');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/pet-care-system';

app.use(cors());
app.use(express.json());

// Simple format validators (backend safety check).
const isValidVisitId = (visitId) => /^[A-Z]{3}-\d{4}$/.test(visitId);
const isValidOwnerId = (ownerId) => /^OWN-\d{4}$/.test(ownerId);

const seedSampleData = async () => {
  const count = await Visit.countDocuments();
  if (count > 0) return;

  // Sample records for testing search and update flows.
  await Visit.insertMany([
    {
      visitId: 'VIS-1001',
      ownerId: 'OWN-2001',
      petName: 'Buddy',
      serviceType: 'Grooming',
      visitTime: new Date('2026-04-20T10:00:00.000Z'),
      bookingStatus: 'CONFIRMED',
    },
    {
      visitId: 'VIS-1002',
      ownerId: 'OWN-2002',
      petName: 'Luna',
      serviceType: 'Vaccination',
      visitTime: new Date('2026-04-21T11:30:00.000Z'),
      bookingStatus: 'PENDING',
    },
    {
      visitId: 'VIS-1003',
      ownerId: 'OWN-2003',
      petName: 'Charlie',
      serviceType: 'General Checkup',
      visitTime: new Date('2026-04-22T09:15:00.000Z'),
      bookingStatus: 'COMPLETED',
    },
  ]);

  console.log('Sample visit data inserted.');
};

// Health endpoint (optional helper for quick checks).
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// POST /search: Find record by visitId + ownerId.
app.post('/search', async (req, res) => {
  try {
    const { visitId, ownerId } = req.body;

    if (!visitId || !ownerId) {
      return res.status(400).json({ message: 'visitId and ownerId are required.' });
    }

    if (!isValidVisitId(visitId) || !isValidOwnerId(ownerId)) {
      return res.status(400).json({ message: 'Invalid format for visitId or ownerId.' });
    }

    const visit = await Visit.findOne({ visitId, ownerId });

    if (!visit) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    return res.status(200).json({ message: 'Record found.', data: visit });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT /update: Update only visitTime and serviceType, only if bookingStatus = CONFIRMED.
app.put('/update', async (req, res) => {
  try {
    const { visitId, ownerId, visitTime, serviceType } = req.body;

    if (!visitId || !ownerId) {
      return res.status(400).json({ message: 'visitId and ownerId are required.' });
    }

    if (!isValidVisitId(visitId) || !isValidOwnerId(ownerId)) {
      return res.status(400).json({ message: 'Invalid format for visitId or ownerId.' });
    }

    const visit = await Visit.findOne({ visitId, ownerId });

    if (!visit) {
      return res.status(404).json({ message: 'Record not found.' });
    }

    if (visit.bookingStatus !== 'CONFIRMED') {
      return res.status(403).json({
        message: 'Update not allowed. Only CONFIRMED bookings can be updated.',
      });
    }

    // Restrict updates to allowed fields only.
    if (typeof serviceType === 'string' && serviceType.trim()) {
      visit.serviceType = serviceType.trim();
    }

    if (visitTime) {
      const parsedDate = new Date(visitTime);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: 'Invalid visitTime format.' });
      }
      visit.visitTime = parsedDate;
    }

    await visit.save();

    return res.status(200).json({ message: 'Update successful.', data: visit });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected.');
    await seedSampleData();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
