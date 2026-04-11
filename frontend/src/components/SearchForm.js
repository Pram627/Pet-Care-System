import React from 'react';

function SearchForm({ formData, errors, onChange, onSubmit, loading }) {
  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Search Visit Record</h3>

      <label htmlFor="visitId">Visit ID (format: VIS-1001)</label>
      <input
        id="visitId"
        name="visitId"
        value={formData.visitId}
        onChange={onChange}
        placeholder="VIS-1001"
      />
      {errors.visitId && <p className="error">{errors.visitId}</p>}

      <label htmlFor="ownerId">Owner ID (format: OWN-2001)</label>
      <input
        id="ownerId"
        name="ownerId"
        value={formData.ownerId}
        onChange={onChange}
        placeholder="OWN-2001"
      />
      {errors.ownerId && <p className="error">{errors.ownerId}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;
