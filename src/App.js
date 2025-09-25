import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import MaidForm from './MaidForm';
import OwnerForm from './OwnerForm';
import Login from './Login';

import HomePage from './HomePage';

function App() {
  const [role, setRole] = useState(null);
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMobile, setUserMobile] = useState('');

  // Check localStorage on app initialization
  useEffect(() => {
    const savedLoginState = localStorage.getItem('househelp_login_state');
    const savedUserMobile = localStorage.getItem('househelp_user_mobile');
    
    if (savedLoginState === 'true' && savedUserMobile) {
      setLoggedIn(true);
      setUserMobile(savedUserMobile);
      setRole('owner');
    }
  }, []);

  // Handle successful login
  const handleLogin = (mobile) => {
    setLoggedIn(true);
    setUserMobile(mobile);
    // Save login state to localStorage
    localStorage.setItem('househelp_login_state', 'true');
    localStorage.setItem('househelp_user_mobile', mobile);
  };

  // Handle logout
  const handleLogout = () => {
    setLoggedIn(false);
    setUserMobile('');
    setRole(null);
    // Clear login state from localStorage
    localStorage.removeItem('househelp_login_state');
    localStorage.removeItem('househelp_user_mobile');
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 40 }}>
      <Paper elevation={3} style={{ padding: 24 }}>
        {!role && (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>Welcome to Househelp Finder</Typography>
            <Box display="flex" justifyContent="center" gap={2} marginY={2}>
            <img src={process.env.PUBLIC_URL + "/assets/broom.png"} alt="Broom Icon" style={{ width: 60, height: 60 }} />
            <img src={process.env.PUBLIC_URL + "/assets/driver-cap.png"} alt="Driver Cap Icon" style={{ width: 60, height: 60 }} />
          </Box>
          <Button variant="contained" color="primary" fullWidth style={{ marginBottom: 16 }} onClick={() => setRole('maid')}>
            ADD MAID/HOUSE HELP
          </Button>
          <Button variant="contained" color="secondary" fullWidth style={{ marginBottom: 16 }} onClick={() => setRole('owner')}>
            REQUIRE DOMESTIC HELP
          </Button>
          
          {/* Emergency Numbers Link */}
          <Box 
            sx={{ 
              mt: 3, 
              p: 2, 
              backgroundColor: '#f5f5f5', 
              borderRadius: 2, 
              border: '1px solid #e0e0e0' 
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666', 
                mb: 1, 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              🚨 Emergency Resources for Magarpatta & Amanora
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2, textAlign: 'center' }}>
              Quick access to important emergency contact numbers and resources
            </Typography>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              sx={{ 
                borderColor: '#d32f2f', 
                color: '#d32f2f',
                '&:hover': { 
                  borderColor: '#b71c1c', 
                  color: '#b71c1c',
                  backgroundColor: '#ffebee'
                }
              }}
              onClick={() => window.open('https://docs.google.com/spreadsheets/d/1DEt5hqWAaLRH4sIkXYYU7WwQDe08UifsSy68txlkWbc/edit?gid=1201954044#gid=1201954044', '_blank')}
            >
              📞 View Emergency Contact Numbers
            </Button>
          </Box>
          </Box>
        )}
        {role === 'maid' && <MaidForm onBack={() => setRole(null)} />}
        {role === 'owner' && !showOwnerForm && !loggedIn && (
          <Login
            onLogin={handleLogin}
            onRegister={() => setShowOwnerForm(true)}
            onBack={() => setRole(null)}
          />
        )}
        {role === 'owner' && !showOwnerForm && loggedIn && (
          <HomePage onBack={handleLogout} userMobile={userMobile} />
        )}
        {role === 'owner' && showOwnerForm && <OwnerForm onBack={() => { setRole(null); setShowOwnerForm(false); }} />}
      </Paper>
    </Container>
  );
}

export default App;
