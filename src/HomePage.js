  // Restore phone input dialog for manual update
  // Fix: move handler inside HomePage for direct access to state
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Avatar, Grid, Box, Button, Typography, TextField, IconButton, Tooltip, Menu, MenuItem, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Rating, Paper } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from './config';
import MaidForm from './MaidForm';
import FeedbackForm from './FeedbackForm';
// ...existing code...
  // Place this function inside HomePage for correct scope

function ConnectButton({ maid, disabled = false, isMobile }) {
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
            width: isMobile ? '100%' : 'auto', 
            px: isMobile ? 1 : 2,
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
      <Button 
        variant="contained" 
        color="success" 
        size="small"
        sx={{
          mt: 1,
          mb: 0,
          minWidth: 0,
          width: isMobile ? '100%' : 'auto',
          px: isMobile ? 1 : 2,
          fontSize: isMobile ? '0.75rem' : '0.85rem',
          py: 0.5,
          borderRadius: 2
        }}
        onClick={() => setShowPhone(!showPhone)}
      >
        {showPhone ? 'HIDE CONTACT' : 'CONNECT'}
      </Button>
      {showPhone && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              size={isMobile ? "medium" : "small"}
              sx={{ minWidth: 0, px: 2, borderRadius: 2, borderColor: '#90caf9', color: '#1976d2' }}
              href={`tel:${maid.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="#1976d2" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 22 2 16.39 2 9.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
              </svg>
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? "medium" : "small"}
              sx={{ minWidth: 0, px: 2, borderRadius: 2, borderColor: '#25D366', color: '#25D366' }}
              href={`https://wa.me/${maid.phone}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
              </svg>
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
              <path fill="#4b6043" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C7.61 22 2 16.39 2 9.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/>
            </svg>
            <Typography sx={{ color: '#4b6043', fontWeight: 500, textAlign: 'left', display: 'inline', fontSize: isMobile ? '0.95rem' : '1.05rem', letterSpacing: 1 }}>
              {maid.phone}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default function HomePage({ onBack, userMobile }) {
  // Unhire slot handler
  const handleUnhire = async (maidPhone, slotIndex) => {
    try {
      const slotNumber = slotIndex + 1; // slot_number is 1-based
      const response = await fetch(`${API_BASE_URL}/api/cosmos/maids/${maidPhone}/slots/${slotNumber}/unhire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ unhired_by_phone: userMobile })
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Slot successfully un-hired!');
        setCurrentView('home');
        // Wait for the view to change, then refresh
        setTimeout(() => {
          handleRefresh();
        }, 100);
      } else {
        alert(result.error || 'Failed to unhire slot.');
      }
    } catch (err) {
      alert('Error unhiring slot.');
      console.error(err);
    }
  };
  // Add the missing handler inside HomePage
  const handleUpdateMaidFormOpen = async () => {
    let phone = '';
    // Create a modal input for better mobile visibility
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter 10-digit househelp number';
    input.maxLength = 10;
    input.pattern = '[0-9]*';
    input.inputMode = 'numeric';
    input.addEventListener('input', function(e) {
      // Remove non-numeric characters
      let val = input.value.replace(/[^0-9]/g, '');
      // Limit to 10 digits
      if (val.length > 10) val = val.slice(0, 10);
      input.value = val;
    });
    input.style.width = '90vw';
    input.style.maxWidth = '400px';
    input.style.fontSize = '1.2em';
    input.style.padding = '12px';
    input.style.border = '2px solid #4b6043';
    input.style.borderRadius = '8px';
    input.style.margin = '16px auto 0 auto';
    input.style.display = 'block';
    input.style.boxSizing = 'border-box';
    const errorDiv = document.createElement('div');
    errorDiv.style.color = '#d32f2f';
    errorDiv.style.fontSize = '1em';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.margin = '8px 0 0 0';
    errorDiv.style.minHeight = '24px';
    const wrapper = document.createElement('div');
    wrapper.appendChild(input);
    wrapper.appendChild(errorDiv);
    const dialog = document.createElement('dialog');
    dialog.appendChild(wrapper);
    dialog.style.padding = '0';
    dialog.style.borderRadius = '12px';
    dialog.style.border = '2px solid #4b6043';
    dialog.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    dialog.style.maxWidth = '95vw';
    dialog.style.background = '#fff';
    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.gap = '12px';
    btnRow.style.marginTop = '12px';

    const okBtn = document.createElement('button');
    okBtn.textContent = 'OK';
    okBtn.style.padding = '8px 24px';
    okBtn.style.background = '#4b6043';
    okBtn.style.color = '#fff';
    okBtn.style.border = 'none';
    okBtn.style.borderRadius = '6px';
    okBtn.style.fontSize = '1em';
    okBtn.onclick = (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!/^[0-9]{10}$/.test(val)) {
        errorDiv.textContent = 'Please enter a valid 10-digit phone number';
        input.focus();
        return;
      }
      phone = val;
      dialog.close();
    };

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back';
    backBtn.style.padding = '8px 24px';
    backBtn.style.background = '#bdbdbd';
    backBtn.style.color = '#333';
    backBtn.style.border = 'none';
    backBtn.style.borderRadius = '6px';
    backBtn.style.fontSize = '1em';
    backBtn.onclick = (e) => {
      e.preventDefault();
      phone = '';
      dialog.close();
    };

    btnRow.appendChild(okBtn);
    btnRow.appendChild(backBtn);
    wrapper.appendChild(btnRow);
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('close', async () => {
      document.body.removeChild(dialog);
      if (!phone) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/cosmos/maids/${phone}`);
        if (!response.ok) {
          throw new Error('Househelp not found with this phone number');
        }
        const data = await response.json();
        if (data.maid) {
          setUpdateMaidData(data.maid);
          setUpdateMaidPhone(phone);
          setUpdateMaidFormOpen(true);
        } else {
          alert('No househelp found with this phone number');
        }
      } catch (error) {
        alert(error.message);
      }
    }, { once: true });
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  // Reset all filters to default values
  const handleResetFilters = () => {
    setFilterWorkType('');
    setFilterLocation('');
    setFilterTimeFrom('05:00');
    setFilterTimeTo('23:00');
    setFilterLiving('');
    setFilterGender('');
    setFilterAvailable(false);
    setFilterHired(false);
  };
  const [searchText, setSearchText] = useState('');
  const [maids, setMaids] = useState([]);
  const [filterWorkType, setFilterWorkType] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterTimeFrom, setFilterTimeFrom] = useState('05:00');
  const [filterTimeTo, setFilterTimeTo] = useState('23:00');
  const [filterLiving, setFilterLiving] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [filterHired, setFilterHired] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hiringSlots, setHiringSlots] = useState({});  // Track hiring state per maid-slot combination
  // Persist user info in localStorage to retain after refresh
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : { phone: '', name: '' };
  });
  // Save user info to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && currentUser.phone) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'profile', 'hired-maids', 'shortlisted-maids'
  const [shortlistedMaids, setShortlistedMaids] = useState([]);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [selectedMaid, setSelectedMaid] = useState(null);
  const [maidReviews, setMaidReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [maidRatings, setMaidRatings] = useState({}); // Store ratings for each maid
  const [maidFormOpen, setMaidFormOpen] = useState(false);
  const [updateMaidFormOpen, setUpdateMaidFormOpen] = useState(false);
  const [updateMaidPhone, setUpdateMaidPhone] = useState('');
  const [updateMaidData, setUpdateMaidData] = useState(null);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);
  const [selectedHireSlot, setSelectedHireSlot] = useState(null);
  const [editedTimeSlot, setEditedTimeSlot] = useState({ startTime: '', endTime: '' });

  // --- Add logic to detect and pre-fill user's own review for editing ---
  const userOwnReview = maidReviews.find(r => r.reviewer_phone === (currentUser && currentUser.phone));

  useEffect(() => {
    // When reviews modal opens or reviews change, pre-fill the form if user has a review
    if (reviewsModalOpen && userOwnReview) {
      setNewReview({ rating: userOwnReview.rating, comment: userOwnReview.comment });
    } else if (reviewsModalOpen) {
      setNewReview({ rating: 5, comment: '' });
    }
    // eslint-disable-next-line
  }, [reviewsModalOpen, userOwnReview]);

  // Helper to convert 12-hour time (e.g., '07:30 AM') to 24-hour (e.g., '07:30')
  function to24Hour(timeStr) {
    if (!timeStr) return '';
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (modifier) {
      if (modifier.toLowerCase() === 'pm' && hours !== '12') {
        hours = String(parseInt(hours, 10) + 12);
      }
      if (modifier.toLowerCase() === 'am' && hours === '12') {
        hours = '00';
      }
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  const handleHireClick = (maid, slotIndex) => {
    const slot = maid.timeSlots && maid.timeSlots[slotIndex];
    if (!slot) {
      alert("Time slot not found for this maid.");
      return;
    }
    setSelectedHireSlot({ maid, slotIndex });
    setEditedTimeSlot({
      startTime: to24Hour(slot.startTime),
      endTime: to24Hour(slot.endTime)
    });
    setHireDialogOpen(true);
  };

  const handleHire = async (maidPhone, slotIndex = 0, customTimeSlot = null) => {
    if (!maidPhone) {
      alert('Maid phone number not available');
      return;
    }
    
    if (!currentUser.phone || !currentUser.name) {
      alert('User information not available. Please refresh the page and try again.');
      return;
    }
    
    const slotKey = `${maidPhone}-${slotIndex}`;
    setHiringSlots(prev => ({ ...prev, [slotKey]: true }));
    try {
      const requestBody = { 
        phone: maidPhone,
        slotIndex: slotIndex + 1, // Send 1-based index to match database columns
        hirerPhone: currentUser.phone,
        hirerName: currentUser.name
      };

      // Add customTimeSlot if provided
      if (customTimeSlot && customTimeSlot.startTime && customTimeSlot.endTime) {
        requestBody.customTimeSlot = {
          startTime: customTimeSlot.startTime,
          endTime: customTimeSlot.endTime
        };
      }

      const response = await fetch(`${API_BASE_URL}/api/maids/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const timeRange = customTimeSlot ? `${customTimeSlot.startTime} to ${customTimeSlot.endTime}` : `slot ${slotIndex + 1}`;
        alert(`Time ${timeRange} hired successfully by ${currentUser.name}! This slot is no longer available.`);
        // Refresh the maid list instead of reloading the page
        await fetchMaids();
      } else {
        alert(data.message || 'Failed to hire maid for this slot');
      }
    } catch (error) {
      console.error('Error hiring maid:', error);
      alert('Error hiring maid. Please try again.');
    } finally {
      const slotKey = `${maidPhone}-${slotIndex}`;
      setHiringSlots(prev => {
        const newState = { ...prev };
        delete newState[slotKey];
        return newState;
      });
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
      
      // Load ratings for all maids after they are fetched
      if (sortedMaids.length > 0) {
        setTimeout(() => loadAllMaidRatings(sortedMaids), 100);
      }
    } catch (error) {
      console.error('Error fetching maids:', error);
      setMaids([]);
    }
  };

  // Fetch maids hired by current user
  const getHiredMaids = () => {
    if (!currentUser.phone) return [];
    
    return maids.filter(maid => {
      // Check if any time slot is hired by current user
      if (maid.timeSlots && maid.timeSlots.length > 0) {
        return maid.timeSlots.some(slot => {
          // Convert both values to strings and trim for comparison
          const slotHirerPhone = String(slot.hirerPhone || '').trim();
          const currentUserPhone = String(currentUser.phone || '').trim();
          const isHired = slot.hired === 1 || slot.hired === '1' || slot.hired === true;
          const phoneMatch = slotHirerPhone === currentUserPhone;
          
          return isHired && phoneMatch;
        });
      }
      return false;
    });
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

  // Shortlist management functions
  const loadShortlistedMaids = async () => {
    if (!currentUser.phone) {
      setShortlistedMaids([]);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/shortlist?owner_phone=${encodeURIComponent(currentUser.phone)}`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setShortlistedMaids(result.shortlisted_maids || []);
      } else {
        console.error('Failed to load shortlisted maids:', result.message);
        setShortlistedMaids([]);
      }
    } catch (error) {
      console.error('Error loading shortlisted maids:', error);
      setShortlistedMaids([]);
    }
  };

  const saveShortlistedMaids = (shortlisted) => {
    // This function is now handled by toggleShortlist API calls
    // But keeping for compatibility
    setShortlistedMaids(shortlisted);
  };

  const isShortlisted = (maidPhone) => {
    return shortlistedMaids.includes(maidPhone);
  };

  const toggleShortlist = async (maidPhone) => {
    if (!currentUser.phone) {
      alert('Please log in to shortlist maids');
      return;
    }
    
    const isCurrentlyShortlisted = shortlistedMaids.includes(maidPhone);
    const action = isCurrentlyShortlisted ? 'remove' : 'add';
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/shortlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner_phone: currentUser.phone,
          maid_phone: maidPhone,
          action: action
        })
      });
      
      const result = await response.json();
      
      if (result.status === 'success') {
        // Update local state immediately for better UX
        const updatedShortlist = isCurrentlyShortlisted
          ? shortlistedMaids.filter(phone => phone !== maidPhone)
          : [...shortlistedMaids, maidPhone];
        setShortlistedMaids(updatedShortlist);
      } else {
        console.error('Failed to update shortlist:', result.message);
        alert('Failed to update shortlist. Please try again.');
      }
    } catch (error) {
      console.error('Error updating shortlist:', error);
      alert('Failed to update shortlist. Please try again.');
    }
  };

  const getShortlistedMaidsData = () => {
    return maids.filter(maid => shortlistedMaids.includes(maid.phone));
  };

  // Rating functions
  const getMaidRating = (maidPhone) => {
    return maidRatings[maidPhone] || { averageRating: 0, totalReviews: 0 };
  };

  const loadMaidRating = async (maidPhone) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/maids/${encodeURIComponent(maidPhone)}/reviews`);
      const result = await response.json();
      
      if (result.status === 'success' && result.reviews) {
        const reviews = result.reviews;
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
          : 0;
        
        setMaidRatings(prev => ({
          ...prev,
          [maidPhone]: { averageRating, totalReviews }
        }));
      }
    } catch (error) {
      console.error('Error loading maid rating:', error);
    }
  };

  const loadAllMaidRatings = async (maidsToLoad = maids) => {
    if (maidsToLoad.length === 0) return;
    
    // Load ratings for all maids
    const ratingPromises = maidsToLoad.map(maid => loadMaidRating(maid.phone));
    await Promise.all(ratingPromises);
  };

  // Reviews management functions
  const handleOpenReviews = async (maid) => {
    setSelectedMaid(maid);
    setReviewsModalOpen(true);
    await loadMaidReviews(maid.phone);
  };

  const loadMaidReviews = async (maidPhone) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/maids/${encodeURIComponent(maidPhone)}/reviews`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setMaidReviews(result.reviews || []);
      } else {
        console.error('Failed to load reviews:', result.message);
        setMaidReviews([]);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      setMaidReviews([]);
    }
  };

  const handleSubmitReview = async () => {
    if (!currentUser.phone || !currentUser.name) {
      alert('Please log in to submit a review');
      return;
    }

    if (!newReview.comment.trim()) {
      alert('Please enter a review comment');
      return;
    }

    setSubmittingReview(true);
    try {
      let response;
      if (userOwnReview) {
        // Update existing review: use PUT /api/reviews/<review_id>
        response = await fetch(`${API_BASE_URL}/api/reviews/${encodeURIComponent(userOwnReview.review_id)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            maid_phone: selectedMaid.phone,
            reviewer_phone: currentUser.phone,
            rating: newReview.rating,
            comment: newReview.comment
          }),
        });
      } else {
        // New review: use POST /api/maids/<maid_phone>/reviews
        response = await fetch(`${API_BASE_URL}/api/maids/${encodeURIComponent(selectedMaid.phone)}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewer_name: currentUser.name,
            reviewer_phone: currentUser.phone,
            rating: newReview.rating,
            comment: newReview.comment
          }),
        });
      }

      const result = await response.json();

      if (result.status === 'success') {
        alert(userOwnReview ? 'Review updated successfully!' : 'Review submitted successfully!');
        setNewReview({ rating: 5, comment: '' });
        await loadMaidReviews(selectedMaid.phone); // Reload reviews
        await loadMaidRating(selectedMaid.phone); // Refresh rating display
      } else {
        alert(result.message || (userOwnReview ? 'Failed to update review' : 'Failed to submit review'));
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(userOwnReview ? 'Failed to update review. Please try again.' : 'Failed to submit review. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleCloseReviews = () => {
    setReviewsModalOpen(false);
    setSelectedMaid(null);
    setMaidReviews([]);
    setNewReview({ rating: 5, comment: '' });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMaids();
    setRefreshing(false);
  };

  // Profile menu handlers
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
    handleProfileMenuClose();
  };

  const handleViewHiredMaids = () => {
    setCurrentView('hired-maids');
    handleProfileMenuClose();
  };

  const handleViewShortlistedMaids = () => {
    setCurrentView('shortlistedMaids');
    handleProfileMenuClose();
  };

  const handleOpenMaidForm = () => {
    setMaidFormOpen(true);
    handleProfileMenuClose();
  };

  const handleCloseMaidForm = () => {
    setMaidFormOpen(false);
  };

  const handleMaidFormSuccess = () => {
    // Refresh maids list after successful submission
    fetchMaids();
    handleCloseMaidForm();
  };

  // Format name as "First Name + Last Initial"
  const formatDisplayName = (fullName) => {
    if (!fullName) return '';
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0];
    }
    const firstName = nameParts[0];
    const lastInitial = nameParts[nameParts.length - 1][0];
    return `${firstName} ${lastInitial}.`;
  };

  // Handlers for updating maid details
  // New handler: open update form with maid data from card
  const handleEditMaidFromCard = async (maid) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cosmos/maids/${maid.phone}`);
      if (!response.ok) {
        throw new Error('Could not fetch latest househelp data');
      }
      const data = await response.json();
      if (data.maid) {
        setUpdateMaidData(data.maid);
        setUpdateMaidPhone(maid.phone);
        setUpdateMaidFormOpen(true);
      } else {
        alert('No househelp found with this phone number');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleUpdateMaidFormClose = () => {
    setUpdateMaidFormOpen(false);
    setUpdateMaidData(null);
    setUpdateMaidPhone('');
  };

  const handleUpdateMaidSuccess = () => {
    fetchMaids();
    handleUpdateMaidFormClose();
  };

  // Convert time string to minutes for comparison (supports both 12-hour and 24-hour formats)
  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    
    // Handle 12-hour format (e.g., "9:00 AM", "2:30 PM")
    const time12HrMatch = timeStr.match(/(\d{1,2}):?(\d{0,2})\s*(AM|PM)/i);
    if (time12HrMatch) {
      let hours = parseInt(time12HrMatch[1]);
      const minutes = parseInt(time12HrMatch[2]) || 0;
      const period = time12HrMatch[3].toUpperCase();
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    }
    
    // Handle 24-hour format (e.g., "09:00", "14:30")
    const time24HrMatch = timeStr.match(/(\d{1,2}):(\d{2})/);
    if (time24HrMatch) {
      const hours = parseInt(time24HrMatch[1]);
      const minutes = parseInt(time24HrMatch[2]);
      return hours * 60 + minutes;
    }
    
    return 0;
  };

  const handleBackToHome = () => {
    setCurrentView('home');
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

  // Load shortlisted maids when user changes
  React.useEffect(() => {
    loadShortlistedMaids();
  }, [currentUser.phone]);

  const workTypeOptions = Array.from(new Set(maids.flatMap(m => (m.workType ? m.workType.split(',').map(w => w.trim()) : [])))).filter(Boolean);
  const locationOptions = Array.from(new Set(maids.flatMap(m => (m.location ? m.location.split(',').map(l => l.trim()) : [])))).filter(Boolean);
  const genderOptions = Array.from(new Set(maids.map(m => m.gender).filter(Boolean)));

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
    const genderMatch = !filterGender || (maid.gender && maid.gender === filterGender);
    // Updated time range matching to check if maid's availability overlaps with filter range
    const timeRangeMatch = (!filterTimeFrom && !filterTimeTo) || (() => {
      const filterFromMinutes = filterTimeFrom ? timeToMinutes(filterTimeFrom) : 0;
      const filterToMinutes = filterTimeTo ? timeToMinutes(filterTimeTo) : 1440; // 1440 = 24 hours in minutes
      // Check timeSlots if available
      if (maid.timeSlots && maid.timeSlots.length > 0) {
        return maid.timeSlots.some(slot => {
          const slotStartMinutes = timeToMinutes(slot.startTime);
          const slotEndMinutes = timeToMinutes(slot.endTime);
          // Check if there's any overlap between slot time and filter time range
          return (slotStartMinutes <= filterToMinutes && slotEndMinutes >= filterFromMinutes);
        });
      }
      // Fallback to legacy startTime/endTime
      if (maid.startTime || maid.endTime) {
        const maidStartMinutes = timeToMinutes(maid.startTime);
        const maidEndMinutes = timeToMinutes(maid.endTime);
        return (maidStartMinutes <= filterToMinutes && maidEndMinutes >= filterFromMinutes);
      }
      return true; // If no time data available, include in results
    })();
    const livingMatch = !filterLiving || (filterLiving === 'Yes' ? maid.living === 1 || maid.living === '1' : maid.living === 0 || maid.living === '0');
    // Available filter: if checked, show only available maids (not completely hired)
    const availableMatch = !filterAvailable || !isCompletelyHired(maid);
    // Hired filter: if checked, show only completely hired maids
    const hiredMatch = !filterHired || isCompletelyHired(maid);
    // Don't show both available and hired at the same time
    if (filterAvailable && filterHired) {
      return false;
    }
    return workTypeMatch && locationMatch && genderMatch && timeRangeMatch && livingMatch && availableMatch && hiredMatch;
  });
  const searchLower = searchText.toLowerCase();
  const searchedMaids = filteredMaids.filter(maid => {
    return (
      (maid.name && maid.name.toLowerCase().includes(searchLower)) ||
      (maid.workType && maid.workType.toLowerCase().includes(searchLower)) ||
      (maid.location && maid.location.toLowerCase().includes(searchLower))
    );
  });

  // Profile View Component
  const ProfileView = () => (
    <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 0 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0e8 100%)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBackToHome} sx={{ mr: 2, color: '#7c9473' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/>
          </svg>
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c9473', letterSpacing: 1 }}>
          My Profile
        </Typography>
      </Box>
      
      <Card sx={{ maxWidth: 500, mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
        <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: '#7c9473', width: { xs: 72, sm: 96 }, height: { xs: 72, sm: 96 }, fontSize: { xs: '1.25rem', sm: '2rem' } }}>
              {(() => {
                if (!currentUser.name) return 'U';
                const names = currentUser.name.split(' ');
                if (names.length >= 2) {
                  return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
                }
                return currentUser.name[0].toUpperCase();
              })()}
            </Avatar>
          }
          title={
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#4b6043' }}>
              {currentUser.name || 'User'}
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.13.37 2.23.72 3.28a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c1.05.35 2.15.59 3.28.72A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <Typography variant="body1" sx={{ color: '#4b6043' }}>
                <strong>Phone:</strong> {currentUser.phone}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <Typography variant="body1" sx={{ color: '#4b6043' }}>
                <strong>Account Type:</strong> House Owner
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <path d="M20 8v6M23 11l-3 3-3-3"></path>
              </svg>
              <Typography variant="body1" sx={{ color: '#4b6043' }}>
                <strong>Total Hired Maids:</strong> {getHiredMaids().length}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  // My Hired Maids View Component
  const HiredMaidsView = () => {
    const hiredMaids = getHiredMaids();
    
    return (
      <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 0 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0e8 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBackToHome} sx={{ mr: 2, color: '#7c9473' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/>
            </svg>
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c9473', letterSpacing: 1 }}>
            My Hired Maids ({hiredMaids.length})
          </Typography>
        </Box>

        {hiredMaids.length === 0 ? (
          <Card sx={{ maxWidth: 500, mx: 'auto', borderRadius: 3, boxShadow: 3, p: 4, textAlign: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="#9e9e9e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <Typography variant="h6" sx={{ color: '#9e9e9e', mb: 2 }}>
              No Hired Maids Yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#9e9e9e', mb: 3 }}>
              You haven't hired any help yet. Browse the available househelp and hire them for specific time slots.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#7c9473', '&:hover': { backgroundColor: '#5d7054' } }}
              onClick={handleBackToHome}
            >
              Browse Maids
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {hiredMaids.map((maid, idx) => (
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
                  background: 'linear-gradient(120deg, #e8f5e8 0%, #f0f8f0 100%)',
                  border: '2px solid #4caf50',
                }}>
                  <Box sx={{ position: 'absolute', top: 8, right: 12, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                    <Button variant="text" sx={{ color: '#1976d2', fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', minWidth: 'auto', p: 0 }}
                      onClick={() => handleEditMaidFromCard(maid)}
                    >
                      Edit Househelp
                    </Button>
                    <Box>
                      {maid.photoPath ? (
                        <Avatar
                          src={maid.photoPath.startsWith('http') ? maid.photoPath : `${API_BASE_URL}/uploads/${maid.photoPath}`}
                          alt={maid.name}
                          sx={{ width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 } }}
                        />
                      ) : (
                        <Avatar sx={{ width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 } }}>{maid.name ? maid.name[0] : '?'}</Avatar>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, position: 'relative', pl: 0, pr: 0 }}>
                    <CardHeader
                      avatar={null}
                      title={
                        <div style={{ textAlign: 'left' }}>
                          {/* Average Rating Display */}
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                            <Rating 
                              value={getMaidRating(maid.phone).averageRating} 
                              readOnly 
                              size="small" 
                              precision={0.1}
                            />
                            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                              ({getMaidRating(maid.phone).totalReviews} review{getMaidRating(maid.phone).totalReviews !== 1 ? 's' : ''})
                            </Typography>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'left', wordBreak: 'break-word', color: '#4b6043' }}>
                              {maid.name}
                            </Typography>
                            <Box sx={{ 
                              ml: 1, 
                              px: 1, 
                              py: 0.2, 
                              backgroundColor: '#4caf50', 
                              color: 'white', 
                              borderRadius: 1, 
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              display: 'inline-flex',
                              alignItems: 'center'
                            }}>
                              ✓ HIRED
                            </Box>
                          </div>
                          {/* Gender */}
                          {maid.gender && (
                            <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                  <circle cx="12" cy="8" r="7"></circle>
                                  <path d="M12 15v7"></path>
                                  <path d="M9 18h6"></path>
                                </svg>
                              </span>
                              {maid.gender}
                            </Typography>
                          )}
                          {/* Location */}
                          {maid.location && (
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: '#7c9473', 
                                mb: 0.5, 
                                display: 'block', 
                                lineHeight: 1.4,
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-line',
                                p: 0,
                                width: '100%',
                                overflowWrap: 'anywhere',
                                maxWidth: '100%',
                              }}
                            >
                              <span style={{ display: 'block', marginBottom: 4, width: '100%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                  <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                              </span>
                              <span style={{
                                display: 'block',
                                width: '100%',
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                                whiteSpace: 'pre-line',
                              }}>{maid.location}</span>
                            </Typography>
                          )}
                          {/* Work Type */}
                          <Typography variant="body1" sx={{ textAlign: 'left', wordBreak: 'break-word', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4M8 3v4M2 11h20"></path></svg>
                            </span>
                            <span style={{ fontWeight: 'normal', color: '#4b6043' }}>{maid.workType}</span>
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                            
                            <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, fontWeight: 'bold' }}>Your Hired Slots:</Typography>
                            {maid.timeSlots && maid.timeSlots.length > 0 ? (
                              maid.timeSlots
                                .map((slot, originalIndex) => ({ slot, originalIndex }))
                                .filter(({ slot }) => slot.hired === 1 && slot.hirerPhone === currentUser.phone)
                                .map(({ slot, originalIndex }, index) => (
                                <Box 
                                  key={originalIndex}
                                  sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 0.3, 
                                    ml: 1,
                                    background: '#e8f5e8',
                                    borderRadius: 1,
                                    p: 1,
                                    width: '100%'
                                  }}
                                >
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: '#2e7d32', 
                                      display: 'flex',
                                      alignItems: 'center',
                                      flex: 1,
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    <span style={{ 
                                      display: 'inline-flex', 
                                      alignItems: 'center', 
                                      marginRight: 6,
                                      minWidth: '16px'
                                    }}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12,6 12,12 16,14"/>
                                      </svg>
                                    </span>
                                    {slot.startTime} to {slot.endTime}
                                    {slot.hirerName && (
                                      <span style={{ 
                                        marginLeft: 8, 
                                        fontSize: '0.8em', 
                                        color: '#2e7d32'
                                      }}>
                                        (Hired by {slot.hirerName})
                                      </span>
                                    )}
                                  </Typography>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    sx={{ 
                                      minWidth: 0, 
                                      px: 1,
                                      py: 0.5,
                                      fontSize: '0.7rem',
                                      ml: 2,
                                      borderColor: '#d32f2f',
                                      color: '#d32f2f',
                                      '&:hover': {
                                        backgroundColor: '#ffebee',
                                        borderColor: '#c62828'
                                      }
                                    }}
                                    onClick={() => handleUnhire(maid.phone, originalIndex)}
                                    disabled={hiringSlots[`${maid.phone}-${originalIndex}`]}
                                  >
                                    {hiringSlots[`${maid.phone}-${originalIndex}`] ? 'Processing...' : 'UNHIRE'}
                                  </Button>
                                </Box>
                              ))
                            ) : null}
                          </Box>
                          <Box sx={{ 
                            width: '100%', 
                            mt: 2, 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: { xs: 1.5, sm: 2 }
                          }}>
                            <ConnectButton maid={maid} isMobile={isMobile} />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenReviews(maid)}
                              sx={{
                                minWidth: 0,
                                px: 2,
                                py: 1,
                                fontSize: '0.75rem',
                                borderColor: '#7c9473',
                                color: '#7c9473',
                                '&:hover': {
                                  backgroundColor: '#f5f8f5',
                                  borderColor: '#5d7054'
                                }
                              }}
                            >
                              Reviews
                            </Button>
                          </Box>
                        </div>
                      }
                      subheader={null}
                      sx={{ textAlign: 'left' }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  // Shortlisted Maids View Component
  const ShortlistedMaidsView = () => {
    const shortlistedMaidsData = getShortlistedMaidsData();
    
    return (
      <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 0 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0e8 100%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={handleBackToHome} sx={{ mr: 2, color: '#7c9473' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/>
            </svg>
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c9473', letterSpacing: 1 }}>
            Shortlisted Maids ({shortlistedMaidsData.length})
          </Typography>
        </Box>

        {shortlistedMaidsData.length === 0 ? (
          <Card sx={{ maxWidth: 500, mx: 'auto', borderRadius: 3, boxShadow: 3, p: 4, textAlign: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="#9e9e9e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
            </svg>
            <Typography variant="h6" sx={{ color: '#9e9e9e', mb: 2 }}>
              No Shortlisted Maids Yet
            </Typography>
            <Typography variant="body1" sx={{ color: '#9e9e9e', mb: 3 }}>
              You haven't shortlisted anyone yet. Browse the available househelp and click the heart icon to add them to your shortlist.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#7c9473', '&:hover': { backgroundColor: '#5d7054' } }}
              onClick={handleBackToHome}
            >
              Browse Maids
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {shortlistedMaidsData.map((maid, idx) => (
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
                  background: 'linear-gradient(120deg, #fef7f0 0%, #fff5f5 100%)',
                  border: '2px solid #ff6b35',
                }}>
                  <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                    {maid.photoPath ? (
                      <Avatar
                        src={maid.photoPath.startsWith('http') ? maid.photoPath : `${API_BASE_URL}/uploads/${maid.photoPath}`}
                        alt={maid.name}
                        sx={{ width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 } }}
                      />
                    ) : (
                      <Avatar sx={{ width: { xs: 64, sm: 96 }, height: { xs: 64, sm: 96 } }}>{maid.name ? maid.name[0] : '?'}</Avatar>
                    )}
                  </Box>
                  
                  <Box sx={{ flex: 1, position: 'relative', pl: 0, pr: 0 }}>
                    <CardHeader
                      avatar={null}
                      title={
                        <div style={{ textAlign: 'left' }}>
                          {/* Average Rating Display */}
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                            <Rating 
                              value={getMaidRating(maid.phone).averageRating} 
                              readOnly 
                              size="small" 
                              precision={0.1}
                            />
                            <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                              ({getMaidRating(maid.phone).totalReviews} review{getMaidRating(maid.phone).totalReviews !== 1 ? 's' : ''})
                            </Typography>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'left', wordBreak: 'break-word', color: '#4b6043' }}>
                              {maid.name}
                            </Typography>
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
                              ♥ SHORTLISTED
                            </Box>
                          </div>
                          <Typography variant="body1" sx={{ textAlign: 'left', wordBreak: 'break-word', fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4M8 3v4M2 11h20"></path></svg>
                            </span>
                            <span style={{ fontWeight: 'normal', color: '#4b6043' }}>{maid.workType}</span>
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1, mt: 2 }}>
                            <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}>
                              <b>Location:</b> {maid.location && (
                                <span style={{
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                  whiteSpace: 'pre-line',
                                  display: 'inline',
                                }}>
                                  {(maid.location || '').replace(/(.{36})/g, '$1-\n')}
                                </span>
                              )}
                            </Typography>
                            
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
                                    onClick={() => !slot.hired && handleHireClick(maid, index)}
                                    disabled={hiringSlots[`${maid.phone}-${index}`] || slot.hired === 1}
                                  >
                                    {hiringSlots[`${maid.phone}-${index}`] ? 'Hiring...' : (slot.hired === 1 ? 'HIRED' : 'Edit & Hire')}
                                  </Button>
                                </Box>
                              ))
                            ) : null}
                          </Box>
                          <Box sx={{ 
                            width: '100%', 
                            mt: 2, 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' }, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: { xs: 1.5, sm: 2 }
                          }}>
                            <ConnectButton maid={maid} disabled={isCompletelyHired(maid)} />
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleOpenReviews(maid)}
                              sx={{
                                minWidth: 0,
                                px: 2,
                                py: 1,
                                fontSize: '0.75rem',
                                borderColor: '#7c9473',
                                color: '#7c9473',
                                '&:hover': {
                                  backgroundColor: '#f5f8f5',
                                  borderColor: '#5d7054'
                                }
                              }}
                            >
                              Reviews
                            </Button>
                            <IconButton
                              onClick={() => toggleShortlist(maid.phone)}
                              sx={{
                                backgroundColor: isShortlisted(maid.phone) ? '#fff5f5' : 'white',
                                '&:hover': { backgroundColor: isShortlisted(maid.phone) ? '#ffebee' : '#f5f5f5' },
                                width: 40,
                                height: 40,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                border: isShortlisted(maid.phone) ? '2px solid #ff6b35' : '1px solid #ddd'
                              }}
                            >
                              {isShortlisted(maid.phone) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff6b35" viewBox="0 0 24 24">
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                                </svg>
                              )}
                            </IconButton>
                          </Box>
                        </div>
                      }
                      subheader={null}
                      sx={{ textAlign: 'left' }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  // Render different views based on currentView state
  // Render the appropriate view content
  const renderCurrentView = () => {
    if (currentView === 'profile') {
      return <ProfileView />;
    }
    
    if (currentView === 'shortlistedMaids') {
      return <ShortlistedMaidsView />;
    }

    if (currentView === 'hired-maids') {
      return <HiredMaidsView />;
    }

    // Default home view
    return (
      <Box sx={{ minHeight: '100vh', py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 0 }, background: 'linear-gradient(135deg, #f8fafc 0%, #e3f0e8 100%)' }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 3,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700, 
              color: '#7c9473', 
              letterSpacing: 1,
              fontSize: { xs: '1.5rem', sm: '2rem' },
              textAlign: { xs: 'center', sm: 'left' },
              mb: { xs: 1, sm: 0 }
            }}>
              Available househelp ({searchedMaids.length})
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1, mb: 2, gap: 2 }}>
              <Button variant="text" sx={{ color: '#388e3c', fontWeight: 600, textTransform: 'none', fontSize: '1rem' }} onClick={handleOpenMaidForm}>
                Add househelp
              </Button>
              <Button variant="text" sx={{ color: '#1976d2', fontWeight: 600, textTransform: 'none', fontSize: '1rem' }} onClick={handleUpdateMaidFormOpen}>
                Update househelp
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            flexShrink: 0,
            order: { xs: 1, sm: 0 }
          }}>
            <Tooltip title="Refresh Data">
              <IconButton onClick={handleRefresh} sx={{ color: '#7c9473' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                </svg>
              </IconButton>
            </Tooltip>
            
            <IconButton onClick={handleProfileMenuOpen} sx={{ color: '#7c9473' }}>
              <Avatar sx={{ width: 32, height: 32, backgroundColor: '#7c9473', fontSize: '0.9rem' }}>
                {currentUser.name ? (
                  currentUser.name.split(' ').length > 1 
                    ? `${currentUser.name.split(' ')[0][0]}${currentUser.name.split(' ')[currentUser.name.split(' ').length - 1][0]}`
                    : currentUser.name[0]
                ) : '?'}
              </Avatar>
            </IconButton>
            
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }
              }}
            >
              {/* Profile Header */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                  {formatDisplayName(currentUser.name)}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666' }}>
                  {currentUser.phone}
                </Typography>
              </Box>
              
              <MenuItem onClick={() => { handleProfileMenuClose(); setCurrentView('profile'); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </Box>
                  <Typography variant="body2">Profile</Typography>
                </Box>
              </MenuItem>
              
              <MenuItem onClick={handleOpenMaidForm} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <line x1="19" y1="8" x2="19" y2="14"/>
                      <line x1="22" y1="11" x2="16" y2="11"/>
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#4caf50' }}>Add Househelp</Typography>
                </Box>
              </MenuItem>

              <MenuItem onClick={() => { handleProfileMenuClose(); handleUpdateMaidFormOpen(); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                  </svg>
                  <Typography variant="body2" sx={{ color: '#4caf50' }}>Update Househelp</Typography>
                </Box>
              </MenuItem>

              <MenuItem onClick={() => { handleProfileMenuClose(); setCurrentView('hired-maids'); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </Box>
                  <Box>
                    <Typography variant="body2">My Hired Maids</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      ({getHiredMaids().length} hired)
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              
              <MenuItem onClick={() => { handleProfileMenuClose(); setCurrentView('shortlistedMaids'); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e57373" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </Box>
                  <Box>
                    <Typography variant="body2">Shortlisted Maids</Typography>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      ({shortlistedMaids.length} shortlisted)
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
              
              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={() => { handleProfileMenuClose(); setFeedbackDialogOpen(true); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#e8f5e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      <path d="M14 8h.01M10 8h.01M6 8h.01"/>
                    </svg>
                  </Box>
                  <Typography variant="body2">Send App Feedback</Typography>
                </Box>
              </MenuItem>
              
              <MenuItem onClick={() => { handleProfileMenuClose(); setCurrentUser({ phone: '', name: '' }); setCurrentView('home'); if (typeof onBack === 'function') { onBack(); } navigate('/'); }} sx={{ py: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: 1, 
                    backgroundColor: '#ffebee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16,17 21,12 16,7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#f44336' }}>Logout</Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ 
          borderRadius: 2, 
          backgroundColor: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          px: { xs: 2, sm: 2 }, 
          py: { xs: 1.5, sm: 1 }, 
          mb: 3, 
          boxShadow: 1, 
          maxWidth: { xs: '100%', sm: 600 }, 
          mx: 'auto', 
          border: '1px solid #b2c9ab' 
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8, flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search by name, location, or work type..."
            style={{ 
              border: 'none', 
              outline: 'none', 
              background: 'transparent', 
              fontSize: window.innerWidth <= 600 ? '1rem' : '1.1rem', // Responsive font size
              width: '100%', 
              color: '#4b6043',
              minHeight: '20px'
            }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </Box>
        <Box display="flex" flexWrap="wrap" gap={2} mb={4} sx={{ 
          '& .MuiTextField-root': { 
            minWidth: { xs: '140px', sm: '170px' },
            flex: { xs: '1 1 140px', sm: '0 0 auto' }
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField 
              select 
              label="Type of Work" 
              value={filterWorkType} 
              onChange={e => setFilterWorkType(e.target.value)} 
              SelectProps={{ native: true }} 
              size="small" 
              InputLabelProps={{ shrink: true }}
            >
              <option value="">All</option>
              {workTypeOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </TextField>
            <IconButton 
              sx={{ 
                backgroundColor: '#7c9473',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#4b6043'
                },
                width: 32,
                height: 32,
                '& svg': {
                  width: 18,
                  height: 18
                }
              }}
              onClick={() => {
                const searchInput = document.querySelector('input[type="text"]');
                searchInput.value = filterWorkType;
                searchInput.focus();
                setSearchText(filterWorkType);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField 
              select 
              label="Location" 
              value={filterLocation} 
              onChange={e => setFilterLocation(e.target.value)} 
              SelectProps={{ native: true }} 
              size="small" 
              InputLabelProps={{ shrink: true }}
            >
              <option value="">All</option>
              {locationOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </TextField>
            <IconButton 
              sx={{ 
                backgroundColor: '#7c9473',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#4b6043'
                },
                width: 32,
                height: 32,
                '& svg': {
                  width: 18,
                  height: 18
                }
              }}
              onClick={() => {
                const searchInput = document.querySelector('input[type="text"]');
                searchInput.value = filterLocation;
                searchInput.focus();
                setSearchText(filterLocation);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
            <TextField 
              type="time" 
              label="Available From" 
              value={filterTimeFrom}
              onChange={e => setFilterTimeFrom(e.target.value)} 
              size="small" 
              InputLabelProps={{ shrink: true }}
              inputProps={{
                step: 300, // 5 min intervals
                defaultValue: '06:00'
              }}
              sx={{ minWidth: 90 }}
            />
            <Typography variant="body2" sx={{ color: '#666', px: 0.5 }}>to</Typography>
            <TextField 
              type="time" 
              label="Available To" 
              value={filterTimeTo}
              onChange={e => setFilterTimeTo(e.target.value)} 
              size="small" 
              InputLabelProps={{ shrink: true }}
              inputProps={{
                step: 300, // 5 min intervals
                defaultValue: '18:00'
              }}
              sx={{ minWidth: 90 }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 170 }}>
            {/* Gender Filter Dropdown */}
            <TextField
              select
              id="gender-filter"
              label="Gender"
              value={filterGender}
              onChange={e => setFilterGender(e.target.value)}
              SelectProps={{ native: true }}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 80, maxWidth: 100, mr: 1, background: '#f8fafc' }}
            >
              <option value="">All</option>
              {genderOptions.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </TextField>
            <input
              type="checkbox"
              id="living-filter"
              checked={filterLiving === 'Yes'}
              onChange={e => setFilterLiving(e.target.checked ? 'Yes' : '')}
              style={{ marginRight: 8 }}
            />
            <label htmlFor="living-filter" style={{ fontSize: '14px', color: '#4b6043', marginRight: 16 }}>
              24-hour Live-in
            </label>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="available-filter"
                checked={filterAvailable}
                onChange={e => setFilterAvailable(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              <label htmlFor="available-filter" style={{ fontSize: '14px', color: '#4b6043' }}>
                Available Help
              </label>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="hired-filter"
                checked={filterHired}
                onChange={e => setFilterHired(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              <label htmlFor="hired-filter" style={{ fontSize: '14px', color: '#4b6043' }}>
                Show Hired
              </label>
            </Box>
            {/* Reset Filters Button - moved to end */}
            <IconButton
              aria-label="Reset Filters"
              size="small"
              onClick={handleResetFilters}
              sx={{ ml: 1, border: '1px solid #bdbdbd', background: '#fff', p: 0.5 }}
              title="Reset Filters"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            </IconButton>
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
                  p: { xs: 1.5, sm: 2 },
                  width: { xs: '100%', sm: 400 },
                  maxWidth: { xs: '95vw', sm: 400 },
                  mx: 'auto',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
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
                  <Box sx={{ position: 'absolute', top: 8, right: 12, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                    <Button variant="text" sx={{ color: '#1976d2', fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', minWidth: 'auto', p: 0 }}
                      onClick={() => handleEditMaidFromCard(maid)}
                    >
                      Edit Househelp
                    </Button>
                    <Box>
                      {maid.photoPath ? (
                        <Avatar
                          src={maid.photoPath.startsWith('http') ? maid.photoPath : `${API_BASE_URL}/uploads/${maid.photoPath}`}
                          alt={maid.name}
                          sx={{ width: { xs: 92, sm: 96 }, height: { xs: 92, sm: 96 } }}
                        />
                      ) : (
                        <Avatar sx={{ width: { xs: 92, sm: 96 }, height: { xs: 92, sm: 96 } }}>
                          {maid.name ? (() => {
                            const nameParts = maid.name.trim().split(' ');
                            if (nameParts.length > 1) {
                              return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
                            }
                            return maid.name[0].toUpperCase();
                          })() : '?'}
                        </Avatar>
                      )}
                    </Box>
                  </Box>
                  <Box sx={{ 
                    flex: 1, 
                    position: 'relative', 
                    pl: 0, 
                    pr: { xs: 0, sm: 8 },
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <CardHeader
                      avatar={null}
                      title={
                        <>
                          <div style={{ textAlign: 'left' }}>
                            {/* Average Rating Display */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
                              <Rating 
                                value={getMaidRating(maid.phone).averageRating} 
                                readOnly 
                                size="small" 
                                precision={0.1}
                              />
                              <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                                ({getMaidRating(maid.phone).totalReviews} review{getMaidRating(maid.phone).totalReviews !== 1 ? 's' : ''})
                              </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2, flexWrap: 'wrap' }}>
                              <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                textAlign: 'left', 
                                wordBreak: 'break-word', 
                                color: '#4b6043',
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                              }}>
                                {maid.name}
                              </Typography>
                              {isNewMaid(maid.timestamp) && (
                                <Box sx={{ 
                                  ml: { xs: 0.5, sm: 1 }, 
                                  px: { xs: 0.5, sm: 1 }, 
                                  py: 0.2, 
                                  backgroundColor: '#ff6b35', 
                                  color: 'white', 
                                  borderRadius: 1, 
                                  fontSize: { xs: '0.6rem', sm: '0.7rem' },
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
                                  FULLY HIRED
                                </Box>
                              )}
                            </div>
                          </div>
                        </>
                      }
                      sx={{ pb: 0 }}
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ textAlign: 'left' }}>
                        {maid.gender && (
                          <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="7"></circle>
                                <path d="M12 15v7"></path>
                                <path d="M9 18h6"></path>
                              </svg>
                            </span>
                            {maid.gender}
                          </Typography>
                        )}
                        {maid.location && (
                          <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                            </span>
                            {maid.location}
                          </Typography>
                        )}
                        {maid.workType && (
                          <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 3v4"></path>
                                <path d="M8 3v4"></path>
                                <path d="M3 10h18"></path>
                              </svg>
                            </span>
                            {maid.workType}
                          </Typography>
                        )}
                        {maid.timeSlots && maid.timeSlots.length > 0 ? (
                          <div style={{ marginBottom: 8 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#4b6043', mb: 1, display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 3v4M8 3v4M2 11h20"></path></svg>
                              </span>
                              Time Slots:
                            </Typography>
                            {maid.timeSlots.map((slot, index) => (
                              <Box key={index} sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                p: 1,
                                mb: 1,
                                backgroundColor: slot.hired === 1 ? '#e8f5e8' : '#fff3e0',
                                borderRadius: 1,
                                border: slot.hired === 1 ? '1px solid #4caf50' : '1px solid #ff9800'
                              }}>
                                <Typography variant="body2" sx={{ 
                                  color: slot.hired === 1 ? '#2e7d32' : '#e65100', 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  fontWeight: slot.hired === 1 ? 'bold' : 'normal'
                                }}>
                                  <span style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    marginRight: 6,
                                    width: 14,
                                    height: 14
                                  }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={slot.hired === 1 ? "#2e7d32" : "#e65100"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <circle cx="12" cy="12" r="10"/>
                                      <polyline points="12,6 12,12 16,14"/>
                                    </svg>
                                  </span>
                                  {slot.startTime} to {slot.endTime}
                                  {slot.hirerName && (
                                    <span style={{ 
                                      marginLeft: 8, 
                                      fontSize: '0.8em', 
                                      color: '#2e7d32'
                                    }}>
                                      (Hired by {slot.hirerName})
                                    </span>
                                  )}
                                </Typography>
                                {slot.hired !== 1 && (
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    sx={{
                                      minWidth: 0,
                                      px: 1.5,
                                      py: 0.5,
                                      fontSize: '0.75rem',
                                      ml: 2
                                    }}
                                    onClick={() => handleHireClick(maid, index)}
                                    disabled={hiringSlots[`${maid.phone}-${index}`]}
                                  >
                                    {hiringSlots[`${maid.phone}-${index}`] ? 'Hiring...' : 'Edit & Hire'}
                                  </Button>
                                )}
                              </Box>
                            ))}
                          </div>
                        ) : (
                          maid.startTime && (
                            <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5, display: 'flex', alignItems: 'center' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c9473" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                              </span>
                              <b>Start Time:</b> {maid.startTime}
                            </Typography>
                          )
                        )}
                        
                        {(maid.anywhere === true || maid.anywhere === 1 || maid.living === 1) && (
                          <Typography variant="body1" sx={{ color: '#7c9473', mb: 0.5 }}><b>24-hour Live-in:</b> Yes</Typography>
                        )}
                        {maid.remarks && (
                          <Typography variant="body1" sx={{ color: '#4b6043', mb: 0.5 }}><b>Remarks:</b> {maid.remarks}</Typography>
                        )}
                      </Box>
                      <Box sx={{ 
                        width: '100%', 
                        mt: 2, 
                        display: 'flex', 
                        flexDirection: { xs: 'column', sm: 'row' }, 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        gap: { xs: 1.5, sm: 2 }
                      }}>
                        <ConnectButton maid={maid} disabled={isCompletelyHired(maid)} />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenReviews(maid)}
                          sx={{
                            minWidth: 0,
                            px: 2,
                            py: 1,
                            fontSize: { xs: '0.7rem', sm: '0.75rem' },
                            borderColor: '#7c9473',
                            color: '#7c9473',
                            '&:hover': {
                              backgroundColor: '#f5f8f5',
                              borderColor: '#5d7054'
                            }
                          }}
                        >
                          Reviews
                        </Button>
                        <IconButton
                          onClick={() => toggleShortlist(maid.phone)}
                          sx={{
                            backgroundColor: isShortlisted(maid.phone) ? '#fff5f5' : 'white',
                            '&:hover': { backgroundColor: isShortlisted(maid.phone) ? '#ffebee' : '#f5f5f5' },
                            width: 40,
                            height: 40,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            border: isShortlisted(maid.phone) ? '2px solid #ff6b35' : '1px solid #ddd'
                          }}
                        >
                          {isShortlisted(maid.phone) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff6b35" viewBox="0 0 24 24">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                            </svg>
                          )}
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    );
  };

  // Main component return with modal always available
  return (
    <>
      {/* Reviews Modal - Always rendered */}
      <Dialog open={reviewsModalOpen} onClose={handleCloseReviews} maxWidth="md" fullWidth>
        <DialogTitle>
          Reviews for {selectedMaid?.name}
        </DialogTitle>
        <DialogContent>
          {maidReviews.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', py: 2 }}>
              No reviews yet for this maid.
            </Typography>
          ) : (
            <div>
              <Typography variant="h6" sx={{ mb: 2 }}>Existing Reviews:</Typography>
              {maidReviews.map((review, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 'bold' }}>
                      Anonymous
                    </Typography>
                  </div>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {review.comment}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </div>
          )}
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" sx={{ mb: 2 }}>Add Your Review:</Typography>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>Rating:</Typography>
              <Rating
                value={newReview.rating}
                onChange={(event, newValue) => setNewReview(prev => ({ ...prev, rating: newValue || 1 }))}
              />
            </div>
            <TextField
              label="Your Review"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience with this maid..."
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviews} color="secondary">
            Close
          </Button>
          <Button 
            onClick={handleSubmitReview} 
            color="primary" 
            variant="contained"
            disabled={submittingReview || !newReview.comment.trim()}
          >
            {submittingReview
              ? (userOwnReview ? 'Updating...' : 'Submitting...')
              : (userOwnReview ? 'Update Review' : 'Submit Review')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Maid Form Dialog */}
      <Dialog
        open={updateMaidFormOpen}
        onClose={handleUpdateMaidFormClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid #e0e0e0', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4b6043' }}>
            Update Househelp Details
          </Typography>
          <IconButton onClick={handleUpdateMaidFormClose} size="small">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {updateMaidData && (
            <MaidForm 
              onSuccess={handleUpdateMaidSuccess}
              onCancel={handleUpdateMaidFormClose}
              currentUser={currentUser}
              initialData={updateMaidData}
              isUpdateMode={true}
              phoneReadOnly={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Maid Form Dialog */}
      {maidFormOpen && (
        <Dialog
          open={maidFormOpen}
          onClose={handleCloseMaidForm}
          maxWidth="md"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: 2,
              maxHeight: '90vh'
            }
          }}
        >
          <DialogTitle sx={{ 
            borderBottom: '1px solid #e0e0e0', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#4b6043' }}>
              Add New Househelp
            </Typography>
            <IconButton onClick={handleCloseMaidForm} size="small">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <MaidForm 
              onSuccess={handleMaidFormSuccess}
              onCancel={handleCloseMaidForm}
              currentUser={currentUser}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Render Current View */}
      {renderCurrentView()}

      {/* Feedback Form Dialog */}
      <FeedbackForm 
        open={feedbackDialogOpen}
        onClose={() => setFeedbackDialogOpen(false)}
      />

      {/* Hire Time Slot Dialog */}
      <Dialog open={hireDialogOpen} onClose={() => setHireDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4b6043' }}>
            Customize Time Slot
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              You can adjust the time slot before hiring. The original slot is from {selectedHireSlot?.maid?.timeSlots?.[selectedHireSlot?.slotIndex]?.startTime} to {selectedHireSlot?.maid?.timeSlots?.[selectedHireSlot?.slotIndex]?.endTime}.
            </Typography>
            <TextField
              label="Start Time"
              type="time"
              value={editedTimeSlot.startTime || ''}
              onChange={(e) => setEditedTimeSlot(prev => ({ ...prev, startTime: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
            <TextField
              label="End Time"
              type="time"
              value={editedTimeSlot.endTime || ''}
              onChange={(e) => setEditedTimeSlot(prev => ({ ...prev, endTime: e.target.value }))}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 300 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setHireDialogOpen(false)}
            sx={{ color: '#666' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedHireSlot) {
                handleHire(
                  selectedHireSlot.maid.phone, 
                  selectedHireSlot.slotIndex,
                  editedTimeSlot
                );
                setHireDialogOpen(false);
              }
            }}
            sx={{ 
              backgroundColor: '#4caf50',
              '&:hover': { backgroundColor: '#388e3c' }
            }}
          >
            Hire with Custom Time
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
