import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { API_BASE_URL } from './config';

export default function Login({ onLogin, onRegister, onBack }) {
  const [mobile, setMobile] = useState('');
  const [notRegistered, setNotRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Prevent multiple simultaneous requests
    if (loading) return;
    
    // Validation
    if (!mobile) {
      alert('Please enter your registered mobile number');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert('Please enter a valid 10 digit mobile number.');
      return;
    }
    
    // Reset states and start loading
    setNotRegistered(false);
    setLoading(true);
    
    // Check registration in backend
    try {
      console.log('Checking registration for mobile:', mobile);
      const response = await fetch(`${API_BASE_URL}/api/owners/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobile })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Registration check result:', result);
      
      if (result.status === 'success' && result.registered) {
        console.log('User is registered, proceeding to login');
        // User is registered, trigger the login callback immediately
        onLogin && onLogin(mobile);
      } else {
        console.log('User not registered');
        setNotRegistered(true);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
      alert(`Error checking registration: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  // Always show login form
  return (
    <Box textAlign="center" mt={2}>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <TextField
        label="Mobile Number(10 digit)"
        variant="outlined"
        fullWidth
        value={mobile}
        onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
        inputProps={{ maxLength: 10 }}
        style={{ marginBottom: 24 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginBottom: 16 }}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'LOGGING IN...' : 'LOGIN'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        style={{ marginBottom: 16 }}
        onClick={onRegister}
      >
        REGISTER
      </Button>
      <Button
        variant="text"
        fullWidth
        onClick={onBack}
      >
        BACK TO HOME
      </Button>
      {notRegistered && (
        <Typography color="error" sx={{ mt: 2 }}>
          Mobile number not registered. Please register first.
        </Typography>
      )}
    </Box>
  );
}
