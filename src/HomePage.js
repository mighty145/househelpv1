import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, Avatar, Grid, Box, Button, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import { API_BASE_URL } from './config';

function ConnectButton({ maid, disabled = false }) {
  const [showPhone, setShowPhone] = useState(false);

  if (disabled) {
    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button 
          variant="contained" 
          disabled
          sx={{ 
            mt: 1, 
            mb: 0, 
            minWidth: 0, 
            width: 'auto', 
            px: 2,
            backgroundColor: '#e0e0e0',
            color: '#9e9e9e'
          }}
        >
          Fully Hired
        </Button>
        <Typography variant="body2" sx={{ 
          color: '#9e9e9e', 
          fontSize: '0.75rem', 
          mt: 0.5,
          fontStyle: 'italic'
        }}>
          All time slots are hired
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" color="success" sx={{ mt: 1, mb: 0, minWidth: 0, width: 'auto', px: 2 }} onClick={() => setShowPhone(true)}>
        Connect
      </Button>
      {showPhone && (
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ minWidth: 0, px: 1.5 }}
              href={`tel:${maid.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ minWidth: 0, px: 1.5 }}
              href={`https://wa.me/${maid.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
              </svg>
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 6 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#4b6043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            <Typography variant="body1" sx={{ color: '#4b6043', fontWeight: 'bold', textAlign: 'left', display: 'inline' }}>
              {maid.phone}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function HomePage({ onBack, userMobile }) {
  const [searchText, setSearchText] = useState('');
  const [maids, setMaids] = useState([]);
  const [filterWorkType, setFilterWorkType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStartTime, setFilterStartTime] = useState('');
  const [filterLiving, setFilterLiving] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [hiring, setHiring] = useState(false);
  const [currentUser, setCurrentUser] = useState({ phone: '', name: '' });

  const handleHire = async (maidPhone, slotIndex = 0) => {
    if (!maidPhone) {
      alert('Maid phone number not available');
      return;
    }
    
    if (!currentUser.phone || !currentUser.name) {
      alert('User information not available. Please refresh the page and try again.');
      return;
    }
    
    setHiring(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/maids/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone: maidPhone,
          slotIndex: slotIndex + 1, // Send 1-based index to match database columns
          hirerPhone: currentUser.phone,
          hirerName: currentUser.name
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(`Time slot ${slotIndex + 1} hired successfully by ${currentUser.name}! This slot is no longer available.`);
        // Refresh the maid list instead of reloading the page
        await fetchMaids();
      } else {
        alert(data.message || 'Failed to hire maid for this slot');
      }
    } catch (error) {
      console.error('Error hiring maid:', error);
      alert('Error hiring maid. Please try again.');
    } finally {
      setHiring(false);
    }
  };

  const fetchMaids = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/maids`);
      const data = await response.json();
      
      // Sort maids by timestamp (newest first) as backup in case backend doesn't sort
      const sortedMaids = Array.isArray(data.maids) 
        ? data.maids.sort((a, b) => {
            // Convert timestamp strings to Date objects for comparison
            const dateA = new Date(a.timestamp || '1970-01-01');
            const dateB = new Date(b.timestamp || '1970-01-01');
            return dateB - dateA; // Newest first (descending order)
          })
        : [];
      
      setMaids(sortedMaids);
    } catch (error) {
      console.error('Error fetching maids:', error);
      setMaids([]);
    }
  };

  // Helper function to check if a maid is new (added within last 24 hours)
  const isNewMaid = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date();
    const maidDate = new Date(timestamp);
    const timeDiff = now - maidDate;
    return timeDiff <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  // Helper function to format timestamp for display
  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const maidDate = new Date(timestamp);
    const timeDiff = now - maidDate;
    
    const hours = Math.floor(timeDiff / (60 * 60 * 1000));
    const days = Math.floor(timeDiff / (24 * 60 * 60 * 1000));
    
    if (days === 0) {
      if (hours === 0) return 'Just added';
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    return days === 1 ? '1 day ago' : `${days} days ago`;
  };

  // Helper function to check if all time slots are hired (maid is completely unavailable)
  const isCompletelyHired = (maid) => {
    if (!maid.timeSlots || maid.timeSlots.length === 0) {
      // If no timeSlots, maid is not hired
      return false;
    }
    
    // Check if ALL time slots are hired
    return maid.timeSlots.every(slot => slot.hired === 1);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMaids();
    setRefreshing(false);
  };

  // Fetch current user details
  const fetchUserDetails = async () => {
    if (!userMobile) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/owners/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: userMobile }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setCurrentUser({
          phone: data.owner.phone,
          name: data.owner.name
        });
      } else {
        console.error('Failed to fetch user details:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  React.useEffect(() => {
    fetchMaids();
    fetchUserDetails();
  }, [userMobile]);

  const workTypeOptions = Array.from(new Set(maids.flatMap(m => (m.workType ? m.workType.split(',').map(w => w.trim()) : [])))).filter(Boolean);
  const locationOptions = Array.from(new Set(maids.flatMap(m => (m.location ? m.location.split(',').map(l => l.trim()) : [])))).filter(Boolean);
  const startTimeOptions = Array.from(new Set(
    maids.flatMap(m => {
      if (m.timeSlots && m.timeSlots.length > 0) {
        return m.timeSlots.map(slot => slot.startTime);
      }
      return m.startTime ? [m.startTime] : [];
    }).filter(Boolean)
  ));
  const endTimeOptions = Array.from(new Set(
    maids.flatMap(m => {
      if (m.timeSlots && m.timeSlots.length > 0) {
        return m.timeSlots.map(slot => slot.endTime);
      }
      return m.endTime ? [m.endTime] : [];
    }).filter(Boolean)
  ));

  const filteredMaids = maids.filter(maid => {
    const workTypeMatch = !filterWorkType || (maid.workType && maid.workType.split(',').map(w => w.trim()).includes(filterWorkType));
    const locationMatch = !filterLocation || (maid.location && maid.location.split(',').map(l => l.trim()).includes(filterLocation));
    
    // Updated startTime matching to check both timeSlots and fallback to legacy startTime
    const startTimeMatch = !filterStartTime || (
      (maid.timeSlots && maid.timeSlots.length > 0 && maid.timeSlots.some(slot => slot.startTime === filterStartTime)) ||
      ((!maid.timeSlots || maid.timeSlots.length === 0) && maid.startTime === filterStartTime)
    );
    
    const livingMatch = !filterLiving || (filterLiving === 'Yes' ? maid.living === 1 || maid.living === '1' : maid.living === 0 || maid.living === '0');
    return workTypeMatch && locationMatch && startTimeMatch && livingMatch;
  });
  const searchLower = searchText.toLowerCase();
  const searchedMaids = filteredMaids.filter(maid => {
    return (
      (maid.name && maid.name.toLowerCase().includes(searchLower)) ||
      (maid.workType && maid.workType.toLowerCase().includes(searchLower)) ||
      (maid.location && maid.location.toLowerCase().includes(searchLower))
    );
  });

  return (
    <Box sx={{ minHeight: '100vh', py: 4, background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0e8 100%)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c9473', letterSpacing: 1 }}>Maidfinder</Typography>
          {currentUser.name && (
            <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
              Logged in as: {currentUser.name}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title={refreshing ? 'Refreshing...' : 'Refresh'}>
            <IconButton 
              sx={{ 
                backgroundColor: '#7c9473', 
                color: 'white', 
                '&:hover': { backgroundColor: '#b2c9ab' },
                '&:disabled': { backgroundColor: '#e0e0e0' },
                width: 40,
                height: 40
              }} 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: refreshing ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton 
              sx={{ 
                borderColor: '#7c9473', 
                color: '#7c9473', 
                border: '1px solid #7c9473',
                '&:hover': { 
                  borderColor: '#b2c9ab', 
                  color: '#b2c9ab',
                  backgroundColor: 'rgba(124, 148, 115, 0.1)'
                },
                width: 40,
                height: 40
              }} 
              onClick={onBack}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, #e3f0e8 0%, #f8fafc 100%)', borderRadius: 2, px: 2, py: 1, mb: 3, boxShadow: 1, maxWidth: 600, mx: 'auto', border: '1px solid #b2c9ab' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search by name, profession, or location..."
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', width: '100%', color: '#4b6043' }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </Box>
      <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
        <TextField select label="Type of Work" value={filterWorkType} onChange={e => setFilterWorkType(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
          <option value="">All</option>
          {workTypeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
        </TextField>
        <TextField select label="Location" value={filterLocation} onChange={e => setFilterLocation(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
          <option value="">All</option>
          {locationOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
        </TextField>
        <TextField select label="Available Start Time" value={filterStartTime} onChange={e => setFilterStartTime(e.target.value)} SelectProps={{ native: true }} size="small" style={{ minWidth: 170 }} InputLabelProps={{ shrink: true }}>
          <option value="">All</option>
          {startTimeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
        </TextField>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 170 }}>
          <input
            type="checkbox"
            id="living-filter"
            checked={filterLiving === 'Yes'}
            onChange={e => setFilterLiving(e.target.checked ? 'Yes' : '')}
            style={{ marginRight: 8 }}
          />
          <label htmlFor="living-filter" style={{ fontSize: '14px', color: '#4b6043' }}>
            24-hour Live-in
          </label>
        </Box>
      </Box>
      {searchedMaids.length === 0 ? (
        <Typography>No maids found.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {searchedMaids.map((maid, idx) => (
            <Grid item xs={12} key={idx} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                width: 400,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                position: 'relative',
                background: isCompletelyHired(maid)
                  ? 'linear-gradient(120deg, #f5f5f5 0%, #e8e8e8 100%)' // Gray background for fully hired
                  : isNewMaid(maid.timestamp) 
                    ? 'linear-gradient(120deg, #fff9c4 0%, #f0f8e8 100%)' // Highlight new entries
                    : 'linear-gradient(120deg, #f7fbe7 0%, #e3f0e8 100%)', // Default
                border: isCompletelyHired(maid)
                  ? '1px solid #bdbdbd' // Gray border for fully hired
                  : isNewMaid(maid.timestamp) 
                    ? '2px solid #ffd700' // Gold border for new entries
                    : '1px solid #b2c9ab', // Default border
                opacity: isCompletelyHired(maid) ? 0.7 : 1, // Slightly fade fully hired cards
              }}>
                <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 2 }}>
                  {maid.photoPath ? (
                    <Avatar
                      src={maid.photoPath.startsWith('http') ? maid.photoPath : `${API_BASE_URL}/uploads/${maid.photoPath}`}
                      alt={maid.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 56, height: 56 }}>{maid.name ? maid.name[0] : '?'}</Avatar>
                  )}
                </Box>
                <Box sx={{ flex: 1, position: 'relative', pl: 0, pr: 0 }}>
                  <CardHeader
                    avatar={null}
                    title={
                      <>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'left', wordBreak: 'break-word', color: '#4b6043' }}>
                              {maid.name}
                            </Typography>
                            {isNewMaid(maid.timestamp) && (
                              <Box sx={{ 
                                ml: 1, 
                                px: 1, 
                                py: 0.2, 
                                backgroundColor: '#ff6b35', 
                                color: 'white', 
                                borderRadius: 1, 
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}>
                                ✨ NEW
                              </Box>
                            )}
                            {isCompletelyHired(maid) && (
                              <Box sx={{ 
                                ml: 1, 
                                px: 1, 
                                py: 0.2, 
                                backgroundColor: '#757575', 
                                color: 'white', 
                                borderRadius: 1, 
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                display: 'inline-flex',
                                alignItems: 'center'
                              }}>
                                🚫 FULLY HIRED
                              </Box>
                            )}
                          </div>
                          {maid.timestamp && (
                            <Typography variant="body2" sx={{ 
                              color: '#7c9473', 
                              fontSize: '0.8rem', 
                              mb: 1,
                              fontStyle: 'italic'
                            }}>
                              Added {formatTimeAgo(maid.timestamp)}
                            </Typography>
                          )}
                          <Typography variant="body1" sx={{ textAlign: 'left', wordBreak: 'break-word', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4M8 3v4M2 11h20"></path></svg>
                            </span>
                            <span style={{ fontWeight: 'normal', color: '#4b6043' }}>{maid.workType}</span>
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#7c9473', background: 'linear-gradient(120deg, #f7fbe7 0%, #e3f0e8 100%)', px: 1, borderRadius: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
                            {maid.gender === 'Female' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><circle cx="12" cy="8" r="5"/><line x1="12" y1="13" x2="12" y2="21"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
                            ) : maid.gender === 'Male' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><circle cx="9" cy="15" r="6"/><path d="M16 8V3h-5"/><line x1="16" y1="3" x2="21" y2="8"/></svg>
                            ) : null}
                            {maid.gender}
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                            <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}><b>Preferred Location:</b> {maid.location}</Typography>
                            
                            {/* Display multiple time slots if available, otherwise fallback to single slot */}
                            <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, fontWeight: 'bold' }}>Availability:</Typography>
                            {maid.timeSlots && maid.timeSlots.length > 0 ? (
                              maid.timeSlots.map((slot, index) => (
                                <Box 
                                  key={index}
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    mb: 0.3, 
                                    ml: 1,
                                    width: '100%'
                                  }}
                                >
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: '#4b6043', 
                                      display: 'flex',
                                      alignItems: 'center',
                                      flex: 1
                                    }}
                                  >
                                    <span style={{ 
                                      display: 'inline-flex', 
                                      alignItems: 'center', 
                                      marginRight: 6,
                                      minWidth: '16px'
                                    }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12,6 12,12 16,14"/>
                                      </svg>
                                    </span>
                                    {slot.startTime} to {slot.endTime}
                                    {maid.timeSlots.length > 1 && (
                                      <span style={{ 
                                        marginLeft: 8, 
                                        fontSize: '0.8em', 
                                        color: '#7c9473',
                                        fontWeight: 'bold'
                                      }}>
                                        (Slot {index + 1})
                                      </span>
                                    )}
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    size="small"
                                    sx={{ 
                                      minWidth: 0, 
                                      px: 1,
                                      py: 0.5,
                                      fontSize: '0.75rem',
                                      ml: 2
                                    }}
                                    onClick={() => handleHire(maid.phone, index)}
                                    disabled={hiring || slot.hired === 1}
                                  >
                                    {hiring ? 'Hiring...' : (slot.hired === 1 ? 'HIRED' : 'HIRE')}
                                  </Button>
                                </Box>
                              ))
                            ) : (maid.startTime && maid.endTime) ? (
                              <Box sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 0.3, 
                                ml: 1,
                                width: '100%'
                              }}>
                                <Typography variant="body2" sx={{ color: '#4b6043', flex: 1 }}>
                                  <span style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    marginRight: 6,
                                    minWidth: '16px'
                                  }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"/>
                                      <polyline points="12,6 12,12 16,14"/>
                                    </svg>
                                  </span>
                                  {maid.startTime} to {maid.endTime}
                                </Typography>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  size="small"
                                  sx={{ 
                                    minWidth: 0, 
                                    px: 1,
                                    py: 0.5,
                                    fontSize: '0.75rem',
                                    ml: 2
                                  }}
                                  onClick={() => handleHire(maid.phone, 0)}
                                  disabled={hiring}
                                >
                                  {hiring ? 'Hiring...' : 'HIRE'}
                                </Button>
                              </Box>
                            ) : (
                              <Typography variant="body2" sx={{ color: '#9e9e9e', ml: 1 }}>
                                No availability information
                              </Typography>
                            )}
                            
                            {(maid.anywhere === true || maid.anywhere === 1 || maid.living === 1) && (
                              <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}><b>Live-in:</b> Yes</Typography>
                            )}
                            {maid.remarks && (
                              <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5 }}><b>Remarks:</b> {maid.remarks}</Typography>
                            )}
                          </Box>
                          <Box sx={{ width: '100%', mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ConnectButton maid={maid} disabled={isCompletelyHired(maid)} />
                          </Box>
                        </div>
                      </>
                    }
                    subheader={null}
                    sx={{ textAlign: 'left' }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'left', wordBreak: 'break-word' }}>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
