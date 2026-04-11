import React from 'react';

function UpdateForm({ updateData, onChange, onSubmit, canUpdate, loading }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Update Allowed Fields</h3>

      <label htmlFor="serviceType">Service Type</label>
      <input
        id="serviceType"
        name="serviceType"
        value={updateData.serviceType}
        onChange={onChange}
        disabled={!canUpdate}
      />

      <label htmlFor="visitTime">Visit Time</label>
      <input
        id="visitTime"
        name="visitTime"
        type="datetime-local"
        value={updateData.visitTime}
        onChange={onChange}
        disabled={!canUpdate}
      />

      {!canUpdate && (
        <p className="error">
          Update disabled: only records with bookingStatus = CONFIRMED can be updated.
        </p>
      )}

      <button type="submit" disabled={!canUpdate || loading}>
        {loading ? 'Updating...' : 'Update Record'}
      </button>
    </form>
  );
}

export default UpdateForm;
