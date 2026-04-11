import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RecordDisplay from '../components/RecordDisplay';
import UpdateForm from '../components/UpdateForm';

const API_URL = 'http://localhost:5000';

function VisitSearchPage() {
  const [formData, setFormData] = useState({ visitId: '', ownerId: '' });
  const [errors, setErrors] = useState({});
  const [record, setRecord] = useState(null);
  const [message, setMessage] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateData, setUpdateData] = useState({ serviceType: '', visitTime: '' });

  const validateSearch = () => {
    const newErrors = {};

    if (!formData.visitId.trim()) {
      newErrors.visitId = 'Visit ID is required.';
    } else if (!/^[A-Z]{3}-\d{4}$/.test(formData.visitId.trim())) {
      newErrors.visitId = 'Visit ID format should be VIS-1001.';
    }

    if (!formData.ownerId.trim()) {
      newErrors.ownerId = 'Owner ID is required.';
    } else if (!/^OWN-\d{4}$/.test(formData.ownerId.trim())) {
      newErrors.ownerId = 'Owner ID format should be OWN-2001.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearchChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setRecord(null);

    if (!validateSearch()) return;

    try {
      setSearchLoading(true);
      const response = await fetch(`${API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(`Failure: ${result.message}`);
        return;
      }

      setRecord(result.data);
      setUpdateData({
        serviceType: result.data.serviceType,
        // Convert to datetime-local format.
        visitTime: new Date(result.data.visitTime).toISOString().slice(0, 16),
      });
      setMessage('Record found successfully.');
    } catch (error) {
      setMessage('Failure: Unable to connect to server.');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!record) return;

    try {
      setUpdateLoading(true);
      const response = await fetch(`${API_URL}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitId: record.visitId,
          ownerId: record.ownerId,
          serviceType: updateData.serviceType,
          visitTime: updateData.visitTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(`Failure: ${result.message}`);
        return;
      }

      setRecord(result.data);
      setMessage('Success: Update successful.');
    } catch (error) {
      setMessage('Failure: Unable to connect to server.');
    } finally {
      setUpdateLoading(false);
    }
  };

  const canUpdate = record?.bookingStatus === 'CONFIRMED';

  return (
    <section>
      <SearchForm
        formData={formData}
        errors={errors}
        onChange={handleSearchChange}
        onSubmit={handleSearch}
        loading={searchLoading}
      />

      {message && (
        <p className={message.startsWith('Success') ? 'success' : 'error'}>{message}</p>
      )}

      <RecordDisplay record={record} />

      {record && (
        <UpdateForm
          updateData={updateData}
          onChange={handleUpdateChange}
          onSubmit={handleUpdate}
          canUpdate={canUpdate}
          loading={updateLoading}
        />
      )}
    </section>
  );
}

export default VisitSearchPage;
