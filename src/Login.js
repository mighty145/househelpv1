import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from './config';

export default function Login({ onLogin, onRegister, onBack }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        // User is registered, trigger the login callback immediately with mobile number
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
  const handleBackToWelcome = () => {
    window.location.assign('/');
  };

  return (
    <Box sx={{ maxWidth: isMobile ? 300 : 400, mx: 'auto', mt: isMobile ? 2 : 4, p: isMobile ? 1 : 2, boxShadow: 2, borderRadius: 2 }}>
      <Typography variant={isMobile ? "body1" : "h6"} align="center" gutterBottom>Login</Typography>
      <TextField
        label="10-digit Mobile Number"
        value={mobile}
        onChange={e => setMobile(e.target.value)}
        fullWidth
        margin="normal"
        inputProps={{ maxLength: 10 }}
        size={isMobile ? "small" : "medium"}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        disabled={loading || !/^\d{10}$/.test(mobile)}
        sx={{ mt: isMobile ? 1 : 2 }}
        size={isMobile ? "small" : "medium"}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={onRegister}
        sx={{ mt: isMobile ? 1 : 2 }}
        size={isMobile ? "small" : "medium"}
      >
        Register
      </Button>
      {notRegistered && (
        <Typography color="error" align="center" sx={{ mt: 1 }}>
          The mobile number is not registered, please register and try again
        </Typography>
      )}
      <Button
        variant="text"
        fullWidth
        onClick={handleBackToWelcome}
        sx={{ mt: isMobile ? 1 : 2 }}
        size={isMobile ? "small" : "medium"}
      >
        Back
      </Button>
    </Box>
  );
    }
