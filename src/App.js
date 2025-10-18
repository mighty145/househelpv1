
import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MaidForm from './MaidForm';
import OwnerForm from './OwnerForm';
import Login from './Login';
import HomePage from './HomePage';
import { API_BASE_URL } from './config';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [role, setRole] = useState(null);
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userMobile, setUserMobile] = useState('');
  const [roleState, setRoleState] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/visitors/track`, {
          method: 'POST'
        });
        const data = await response.json();
        if (data.status === 'success') {
          setVisitorCount(data.visitor_count);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };
    trackVisitor();
  }, []);

  const handleLogin = (mobile) => {
    setLoggedIn(true);
    setUserMobile(mobile);
  };
  const handleLogout = () => {
    setLoggedIn(false);
    setUserMobile('');
    setRole(null);
  };

  return (
    <Routes>
      <Route path="/" element={
        <Container maxWidth={isMobile ? "xs" : "sm"} style={{ marginTop: isMobile ? 16 : 40, padding: isMobile ? 8 : 0 }}>
          <Paper elevation={3} style={{ padding: isMobile ? 12 : 24 }}>
            {!role && (
              <Box textAlign="center">
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>Welcome to Househelp Finder</Typography>
                <Box display="flex" justifyContent="center" gap={isMobile ? 1 : 2} marginY={2}>
                  <img src={process.env.PUBLIC_URL + "/assets/broom.png"} alt="Broom Icon" style={{ width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }} />
                  <img src={process.env.PUBLIC_URL + "/assets/driver-cap.png"} alt="Driver Cap Icon" style={{ width: isMobile ? 40 : 60, height: isMobile ? 40 : 60 }} />
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  size={isMobile ? "small" : "medium"}
                  style={{ marginBottom: 24, minWidth: 220, fontWeight: 600, fontSize: 16 }}
                  onClick={() => setRole('owner')}
                >
                  REQUIRE DOMESTIC HELP
                </Button>
                <Box mt={3}>
                  <Paper elevation={2} style={{ padding: 16, background: '#fff8f0', border: '1px solid #ffe0b2' }}>
                    <Typography variant="subtitle2" style={{ color: '#d84315', fontWeight: 600, marginBottom: 4 }}>
                      <span role="img" aria-label="emergency">🎉</span> Emergency Resources for Magarpatta & Amanora
                    </Typography>
                    <Typography variant="body2" style={{ color: '#333', marginBottom: 8 }}>
                      Quick access to important emergency contact numbers and resources
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      style={{ fontWeight: 600 }}
                      fullWidth
                      onClick={() => window.open('https://docs.google.com/spreadsheets/d/1DEt5hqWAaLRH4sIkXYYU7WwQDe08UifsSy68txlkWbc/edit?gid=1201954044#gid=1201954044', '_blank')}
                    >
                      📞 View Emergency Contact Numbers
                    </Button>
                  </Paper>
                  {/* Visitor Counter */}
                  <Box mt={3} textAlign="center">
                    <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                      👥 Total Visitors: {visitorCount.toLocaleString()}
                    </Typography>
                  </Box>
                  {/* Disclaimer */}
                  <Box mt={2} textAlign="center">
                    <Typography variant="caption" sx={{ color: '#b71c1c', fontStyle: 'italic', display: 'block', maxWidth: 480, mx: 'auto' }}>
                      Disclaimer:<br/>
                      This platform solely shares contact information for domestic help. We do not conduct background checks or verify credentials. The responsibility for hiring and due diligence rests entirely with the employer.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
            {role === 'maid' && <MaidForm onBack={() => setRole(null)} />}
            {role === 'owner' && !showOwnerForm && !loggedIn && (
              <Navigate to="/login" replace />
            )}
            {role === 'owner' && !showOwnerForm && loggedIn && (
              <Navigate to="/home" replace />
            )}
            {role === 'owner' && showOwnerForm && <OwnerForm onBack={() => { setRole(null); setShowOwnerForm(false); }} />}
          </Paper>
        </Container>
      } />
      <Route path="/login" element={
        showOwnerForm ? (
          <Container maxWidth={isMobile ? "xs" : "sm"} style={{ marginTop: isMobile ? 16 : 40, padding: isMobile ? 8 : 0 }}>
            <Paper elevation={3} style={{ padding: isMobile ? 12 : 24 }}>
              <OwnerForm onBack={() => setShowOwnerForm(false)} />
            </Paper>
          </Container>
        ) : loggedIn ? (
          <Navigate to="/home" replace />
        ) : (
          <Container maxWidth={isMobile ? "xs" : "sm"} style={{ marginTop: isMobile ? 16 : 40, padding: isMobile ? 8 : 0 }}>
            <Paper elevation={3} style={{ padding: isMobile ? 12 : 24 }}>
              <Login
                onLogin={(mobile) => {
                  setLoggedIn(true);
                  setUserMobile(mobile);
                }}
                onRegister={() => setShowOwnerForm(true)}
                onBack={() => window.history.length > 1 ? window.history.back() : window.location.assign('/')} />
            </Paper>
          </Container>
        )
      } />
      <Route path="/home" element={<HomePage onBack={handleLogout} userMobile={userMobile} />} />
    </Routes>
  );
}


export default App;
