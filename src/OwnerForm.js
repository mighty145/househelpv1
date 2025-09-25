import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { API_BASE_URL } from './config';

function OwnerForm({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone field, only allow numbers and limit to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue.length <= 10) {
        setForm((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple simultaneous requests
    if (loading) return;
    
    // Basic validation
    if (!form.name.trim() || !form.location.trim() || !form.phone.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(form.phone)) {
      alert('Please enter a valid 10 digit phone number');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Submitting owner registration:', form);
      const response = await fetch(`${API_BASE_URL}/api/owners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Registration response:', result);
      
      if (result.status === 'success') {
        alert('Registration successful!');
        setForm({ name: '', location: '', phone: '' });
      } else {
        alert(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error submitting form: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Owner Registration</Typography>
      <TextField 
        label="Name" 
        name="name" 
        value={form.name} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        required 
        disabled={loading}
      />
      <TextField 
        label="Location" 
        name="location" 
        value={form.location} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        required 
        disabled={loading}
      />
      <TextField 
        label="Phone number (10 digits)" 
        name="phone" 
        value={form.phone} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        required 
        disabled={loading}
        inputProps={{ maxLength: 10 }}
        helperText={form.phone.length > 0 ? `${form.phone.length}/10 digits` : 'Enter 10 digit mobile number'}
      />
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        fullWidth
        disabled={loading}
        style={{ marginTop: 16 }}
      >
        {loading ? 'REGISTERING...' : 'SUBMIT'}
      </Button>
      <Button 
        onClick={onBack} 
        fullWidth 
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        BACK
      </Button>
    </form>
  );
}

export default OwnerForm;
