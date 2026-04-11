import React from 'react';

function RecordDisplay({ record }) {
  if (!record) return null;

  return (
    <section className="card">
      <h3>Visit Details</h3>
      <p><strong>Visit ID:</strong> {record.visitId}</p>
      <p><strong>Owner ID:</strong> {record.ownerId}</p>
      <p><strong>Pet Name:</strong> {record.petName}</p>
      <p><strong>Service Type:</strong> {record.serviceType}</p>
      <p><strong>Visit Time:</strong> {new Date(record.visitTime).toLocaleString()}</p>
      <p><strong>Booking Status:</strong> {record.bookingStatus}</p>
    </section>
  );
}

export default RecordDisplay;
