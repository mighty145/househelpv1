import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Checkbox, FormControlLabel, Typography, Box, InputLabel, Select, FormControl, Slider, CircularProgress } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from './config';

// We'll fetch work types and locations from the backend options endpoint.
// Provide a small fallback list so the UI remains usable if the request fails.
const DEFAULT_WORK_TYPES = [
  'Maid',
  'Nanny',
  'Cook',
  'Driver',
  'Other',
];


const startTimes = [
  '05:00 AM','06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
];
const endTimes = [
  '06:00 AM','07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
  '10:00 PM', '11:00 PM', '24 hours',
];


function MaidForm({ onBack, onSuccess, onCancel, currentUser, initialData, isUpdateMode, phoneReadOnly }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Helper functions for custom fields
  function getFinalWorkType(form, customWorkType) {
    if (form.workType.includes('Other') && customWorkType.trim()) {
      return form.workType.filter(w => w !== 'Other').concat(customWorkType.trim());
    }
    return form.workType;
  }
  function getFinalLocation(form, customLocation) {
    if (form.location.includes('Other') && customLocation.trim()) {
      return form.location.filter(l => l !== 'Other').concat(customLocation.trim());
    }
    return form.location;
  }
  const [form, setForm] = useState(() => {
    // Default form state
    const defaultState = {
  name: '',
  phone: '',
  gender: 'Female',
  workType: ['Maid'],
  location: ['Magarpatta'],
  timeSlots: [{ startTime: '06:00 AM', endTime: '07:00 AM' }],
  anywhere: false, // always default to false
  photo: null,
  remarks: '',
  feedback: '',
  available: 1
    };

    // If no initial data, return default state
    if (!initialData) {
      return defaultState;
    }

    // Handle work type conversion
    let workTypeArray = [];
    if (Array.isArray(initialData.work_type)) {
      workTypeArray = initialData.work_type;
    } else if (typeof initialData.work_type === 'string') {
      workTypeArray = initialData.work_type.split(',').filter(Boolean);
    } else {
      workTypeArray = ['Maid'];
    }

    // Handle location conversion
    let locationArray = [];
    if (Array.isArray(initialData.address)) {
      locationArray = initialData.address;
    } else if (typeof initialData.address === 'string') {
      locationArray = initialData.address.split(',').filter(Boolean);
    } else {
      locationArray = ['Magarpatta'];
    }

    // Handle time slots conversion
    let timeSlots = [];
    if (Array.isArray(initialData.available_slots) && initialData.available_slots.length > 0) {
      timeSlots = initialData.available_slots.map(slot => ({
        startTime: slot.start_time || '06:00 AM',
        endTime: slot.end_time || '07:00 AM'
      }));
    } else {
      timeSlots = [{ startTime: '06:00 AM', endTime: '07:00 AM' }];
    }

    // Return initialized state with proper type checking
    return {
      name: initialData.name || defaultState.name,
      phone: initialData.phone || defaultState.phone,
      gender: initialData.gender || defaultState.gender,
      workType: workTypeArray,
      location: locationArray,
      timeSlots: timeSlots,
      anywhere: typeof initialData.live_in_24hrs === 'boolean' ? initialData.live_in_24hrs : false,
      photo: initialData.photo || null,
      remarks: initialData.remarks || '',
      feedback: initialData.feedback || '',
      available: initialData.available ?? defaultState.available
    };
  });

  // Dynamic options loaded from backend
  const [availableWorkTypes, setAvailableWorkTypes] = useState(DEFAULT_WORK_TYPES);
  const [availableLocations, setAvailableLocations] = useState([
    'Magarpatta', 'Amanora', 'Kharadi', 'Hadapsar', 'Manjri', 'No preference', 'Other'
  ]);

  useEffect(() => {
    let mounted = true;
    const loadOptions = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/options/maid`);
        if (!res.ok) return;
        const data = await res.json();
        // Expecting { work_types: [...], locations: [...] }
        if (!mounted) return;
        if (Array.isArray(data.work_types) && data.work_types.length > 0) {
          setAvailableWorkTypes(data.work_types);
        }
        if (Array.isArray(data.locations) && data.locations.length > 0) {
          setAvailableLocations(data.locations);
        }
      } catch (err) {
        // keep defaults on error
        console.warn('Failed to load maid options from backend:', err);
      }
    };
    loadOptions();
    return () => { mounted = false; };
  }, []);

  const [photoMsg, setPhotoMsg] = useState('');
  const [phoneError, setPhoneError] = useState('');
  // Processing indicator for slow backend operations
  const [isProcessing, setIsProcessing] = useState(false);
  // Custom work type and location
  const [customWorkType, setCustomWorkType] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  // Phone number validation function
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for phone number validation
    if (name === 'phone') {
      // Only allow digits and limit to 10 characters
      const cleanedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      
      setForm((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
      
      // Validate phone number
      if (cleanedValue.length === 0) {
        setPhoneError('Phone number is required');
      } else if (cleanedValue.length < 10) {
        setPhoneError('Phone number must be 10 digits');
      } else if (!validatePhone(cleanedValue)) {
        setPhoneError('Please enter a valid 10-digit phone number');
      } else {
        setPhoneError('');
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Time conversion functions for slider
  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'AM' && hours === 12) hours = 0;
    if (period === 'PM' && hours !== 12) hours += 12;
    
    return hours * 60 + (minutes || 0);
  };

  const minutesToTime = (minutes) => {
    const hours24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 === 0 ? 12 : hours24 > 12 ? hours24 - 12 : hours24;
    
    return `${hours12.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const handleTimeSlotChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const checkTimeSlotOverlap = (slots, currentIndex, startMinutes, endMinutes) => {
    for (let i = 0; i < slots.length; i++) {
      if (i === currentIndex) continue;
      
      const slotStart = timeToMinutes(slots[i].startTime);
      const slotEnd = timeToMinutes(slots[i].endTime);
      
      // Check if there's any overlap
      if ((startMinutes < slotEnd && endMinutes > slotStart)) {
        return true;
      }
    }
    return false;
  };

  const handleTimeRangeChange = (index, newRange) => {
    let [startMinutes, endMinutes] = newRange;
    // Allow thumbs to move freely, swap if needed
    if (startMinutes > endMinutes) {
      [startMinutes, endMinutes] = [endMinutes, startMinutes];
    }
    // Prevent zero-length slot
    if (startMinutes === endMinutes) return;
    // Check for overlaps with other slots
    if (checkTimeSlotOverlap(form.timeSlots, index, startMinutes, endMinutes)) {
      // Don't update if there's an overlap - user will see visual feedback
      return;
    }
    const startTime = minutesToTime(startMinutes);
    const endTime = minutesToTime(endMinutes);
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) =>
        i === index ? { ...slot, startTime, endTime } : slot
      )
    }));
  };

  const addTimeSlot = () => {
    if (form.timeSlots.length < 6) {
      // Create a new time slot that doesn't overlap with existing ones
      const existingSlots = form.timeSlots;
      let newStartTime = '08:00 AM';
      let newEndTime = '09:00 AM';
      
      // Find a non-overlapping time slot
      if (existingSlots.length > 0) {
        const lastSlot = existingSlots[existingSlots.length - 1];
        const lastEndMinutes = timeToMinutes(lastSlot.endTime);
        const newStartMinutes = Math.max(lastEndMinutes + 30, 360); // At least 30 min gap, minimum 6 AM
        
        newStartTime = minutesToTime(newStartMinutes);
        newEndTime = minutesToTime(newStartMinutes + 60); // 1 hour duration by default
      }
      
      setForm((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, { startTime: newStartTime, endTime: newEndTime }]
      }));
    }
  };

  const removeTimeSlot = (index) => {
    if (form.timeSlots.length > 1) {
      setForm((prev) => ({
        ...prev,
        timeSlots: prev.timeSlots.filter((_, i) => i !== index)
      }));
    }
  };

  const handleWorkTypeChange = (e) => {
    setForm((prev) => ({ ...prev, workType: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, photo: file }));
    if (file) {
      setPhotoMsg('Photo uploaded successfully!');
    } else {
      setPhotoMsg('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!validatePhone(form.phone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Add current user information from props
    const finalWorkType = getFinalWorkType(form, customWorkType);
    const finalLocation = getFinalLocation(form, customLocation);
    const formData = new FormData();
      formData.append('added_by', currentUser?.name || '');
      formData.append('added_by_phone', currentUser?.phone || '');
      formData.append('updated_by', currentUser?.name || '');
    formData.append('phone', form.phone);
    // For update mode, send to different endpoint
    const endpoint = isUpdateMode ? 
      `${API_BASE_URL}/api/cosmos/maids/${form.phone}` :
      `${API_BASE_URL}/api/maids`;
    formData.append('name', form.name);
    formData.append('gender', form.gender);
    formData.append('workType', Array.isArray(finalWorkType) ? finalWorkType.join(',') : finalWorkType);
    // Send the first time slot for backward compatibility
    formData.append('startTime', form.timeSlots[0].startTime);
    formData.append('endTime', form.timeSlots[0].endTime);
    // Send all time slots as JSON for the available table
    formData.append('timeSlots', JSON.stringify(form.timeSlots));

    const mergedAvailableSlots = form.timeSlots.map((slot, idx) => {
      const existing = (initialData && Array.isArray(initialData.available_slots)) ? (initialData.available_slots[idx] || {}) : {};
      return {
        slot_number: idx + 1,
        start_time: slot.startTime,
        end_time: slot.endTime,
        // preserve hired state if present on the existing record
        hired_flag: existing.hired_flag === true ? true : false,
        hired_by_name: existing.hired_by_name || '',
        hired_by_phone: existing.hired_by_phone || '',
        hired_date: existing.hired_date || null,
        unhired_date: existing.unhired_date || null
      };
    });
    // Attach merged available_slots to FormData so multipart updates (with photo) also preserve hired info
    formData.append('available_slots', JSON.stringify(mergedAvailableSlots));
  formData.append('location', Array.isArray(finalLocation) ? finalLocation.join(',') : finalLocation);
  // Send 'live_in_24hrs' as string for backend to parse correctly
  formData.append('live_in_24hrs', form.anywhere ? 'true' : 'false');
  formData.append('remarks', form.remarks || '');
    formData.append('feedback', form.feedback || '');
    formData.append('available', parseInt(form.available, 10));
    if (form.photo) {
      formData.append('photoPath', form.photo.name);
      formData.append('photo', form.photo);
    } else {
      formData.append('photoPath', '');
    }
  setIsProcessing(true);
  try {
      let response;
      if (isUpdateMode && form.photo) {
        // If updating and a new photo is selected, use FormData and POST (not PUT)
        response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        });
      } else {
        // Default: JSON for update, FormData for create
        response = await fetch(endpoint, {
          method: isUpdateMode ? 'PUT' : 'POST',
          body: isUpdateMode ? JSON.stringify({
            name: form.name,
            gender: form.gender,
            work_type: Array.isArray(finalWorkType) ? finalWorkType.join(',') : finalWorkType,
            address: Array.isArray(finalLocation) ? finalLocation.join(',') : finalLocation,
            live_in_24hrs: !!form.anywhere,
            remarks: form.remarks,
            updated_by: currentUser?.name || '',
            // Use merged slots to preserve any existing hired flags / metadata
            available_slots: mergedAvailableSlots
          }) : formData,
          headers: isUpdateMode ? {
            'Content-Type': 'application/json'
          } : undefined
        });
      }
      
      const result = await response.json();
      if (result.status === 'success') {
        alert(isUpdateMode ? 'Update successful!' : 'Registration successful!');
        
        if (!isUpdateMode) {
          setForm({
            name: '',
            phone: '',
            workType: [],
            location: [],
            timeSlots: [
              { startTime: '06:00 AM', endTime: '07:00 AM' }
            ],
            anywhere: false,
            photo: null,
            remarks: '',
            feedback: '',
            available: '',
          });
        }
        
        // Return to home page after successful registration/update
        if (onSuccess) {
          onSuccess();
        }
      } else {
        // Show the specific error message from the backend
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      alert('Error submitting form. Please try again.');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ padding: isMobile ? 1 : 3 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant={isMobile ? "body1" : "h6"} gutterBottom>Maid Registration</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required size={isMobile ? "small" : "medium"} />
      <TextField 
        label="Phone number (10 digits)" 
        name="phone" 
        value={form.phone} 
        onChange={handleChange} 
        fullWidth 
        margin="normal" 
        required 
        error={!!phoneError}
        helperText={phoneError || (isUpdateMode ? 'Phone number cannot be changed' : 'Enter 10-digit mobile number')}
        InputProps={{
          readOnly: isUpdateMode,
        }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 10
        }}
        size={isMobile ? "small" : "medium"}
      />
  <FormControl fullWidth margin="normal" size={isMobile ? "small" : "medium"}>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
  <FormControl fullWidth margin="normal" size={isMobile ? "small" : "medium"}>
        <InputLabel>Type of work</InputLabel>
        <Select
          multiple
          value={form.workType}
          onChange={handleWorkTypeChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableWorkTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={form.workType.indexOf(type) > -1} />
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          {/* Show custom work type input if 'Other' is selected */}
          {form.workType.includes('Other') && (
            <TextField
              label="Please specify other work type"
              value={customWorkType}
              onChange={e => setCustomWorkType(e.target.value)}
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
          )}
      
      {/* Dynamic Time Slots */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Available Time Slots</Typography>
      {form.timeSlots.map((slot, index) => {
        // Helper to find earliest available free slot
        function getEarliestFreeSlot() {
          const slotDuration = timeToMinutes(slot.endTime) - timeToMinutes(slot.startTime);
          const minStart = 300; // 5:00 AM
          const maxEnd = 1320; // 10:00 PM
          for (let start = minStart; start + slotDuration <= maxEnd; start += 30) {
            const end = start + slotDuration;
            // Check overlap with other slots
            const overlaps = form.timeSlots.some((s, i) => {
              if (i === index) return false;
              const sStart = timeToMinutes(s.startTime);
              const sEnd = timeToMinutes(s.endTime);
              return (start < sEnd && end > sStart);
            });
            if (!overlaps) {
              return [start, end];
            }
          }
          return [timeToMinutes(slot.startTime), timeToMinutes(slot.endTime)]; // fallback
        }
        const startMinutes = timeToMinutes(slot.startTime);
        const endMinutes = timeToMinutes(slot.endTime);
        const hasOverlap = checkTimeSlotOverlap(form.timeSlots, index, startMinutes, endMinutes);
        // Always allow slider to move anywhere in the range
        const sliderValue = [startMinutes, endMinutes];
        return (
          <Box key={index} sx={{
            mb: 3,
            p: 2,
            border: hasOverlap ? '2px solid #f44336' : '1px solid #e0e0e0',
            borderRadius: 2,
            backgroundColor: hasOverlap ? '#ffebee' : 'transparent'
          }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Time Slot {index + 1}
              </Typography>
              {form.timeSlots.length > 1 && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => removeTimeSlot(index)}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  Remove
                </Button>
              )}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => {
                  const [start, end] = getEarliestFreeSlot();
                  handleTimeRangeChange(index, [start, end]);
                }}
                sx={{ minWidth: 'auto', px: 1, ml: 1 }}
              >
                Earliest Free Slot
              </Button>
            </Box>
            {hasOverlap && (
              <Typography variant="caption" sx={{ color: '#f44336', mb: 1, display: 'block' }}>
                ⚠️ This time slot overlaps with another slot
              </Typography>
            )}
            <Box sx={{ px: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Select time range: {slot.startTime} - {slot.endTime}
              </Typography>
              <Slider
                value={sliderValue}
                onChange={(event, newValue) => {
                  // Always allow thumbs to move anywhere, update only if valid
                  let [start, end] = newValue;
                  if (start > end) [start, end] = [end, start];
                  // Prevent zero-length slot
                  if (start === end) return;
                  // Check for overlaps
                  const overlaps = form.timeSlots.some((s, i) => {
                    if (i === index) return false;
                    const sStart = timeToMinutes(s.startTime);
                    const sEnd = timeToMinutes(s.endTime);
                    return (start < sEnd && end > sStart);
                  });
                  if (!overlaps) {
                    handleTimeRangeChange(index, [start, end]);
                  }
                }}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => minutesToTime(value)}
                min={300} // 5:00 AM
                max={1320} // 10:00 PM
                step={30} // 30-minute intervals
                marks={[
                  { value: 360, label: '6 AM' },
                  { value: 540, label: '9 AM' },
                  { value: 720, label: '12 PM' },
                  { value: 900, label: '3 PM' },
                  { value: 1080, label: '6 PM' },
                ]}
                sx={{
                  '& .MuiSlider-thumb': {
                    backgroundColor: hasOverlap ? '#f44336' : '#4b6043',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: hasOverlap ? '#f44336' : '#7c9473',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e0e0e0',
                  },
                  '& .MuiSlider-markLabel': {
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    whiteSpace: 'nowrap',
                  },
                  marginBottom: 3,
                }}
              />
            </Box>
          </Box>
        );
      })}
      
      {form.timeSlots.length < 6 && (
        <Box display="flex" justifyContent="center" marginY={1}>
          <Button 
            variant="outlined" 
            color="primary" 
            size="small" 
            onClick={addTimeSlot}
            sx={{ minWidth: 'auto', px: 2 }}
          >
            + Add Time Slot
          </Button>
        </Box>
      )}

      <FormControl fullWidth margin="normal">
        <InputLabel id="location-label">Preferred location</InputLabel>
        <Select
          labelId="location-label"
          multiple
          name="location"
          value={form.location}
          onChange={(e) => {
            setForm((prev) => ({ ...prev, location: e.target.value }));
          }}
          renderValue={(selected) => selected.join(', ')}
        >
          {availableLocations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              <Checkbox checked={form.location.indexOf(loc) > -1} />
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          {/* Show custom location input if 'Other' is selected */}
          {form.location.includes('Other') && (
            <TextField
              label="Please specify other location"
              value={customLocation}
              onChange={e => setCustomLocation(e.target.value)}
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
            />
          )}

        <TextField
          label="Remarks"
          name="remarks"
          value={form.remarks || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
          size={isMobile ? "small" : "medium"}
        />
      <FormControlLabel
        control={<Checkbox name="anywhere" checked={form.anywhere} onChange={handleChange} />}
        label="24 hours live-in house help"
      />
      <Box marginY={2}>
        <label htmlFor="photo-upload">
          <Button variant="outlined" component="span">
            Upload photo
          </Button>
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          style={{ display: 'none' }}
        />
        {photoMsg && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>{photoMsg}</Typography>
        )}
      </Box>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit" 
          fullWidth
          disabled={isProcessing || !!phoneError || form.phone.length !== 10}
          size={isMobile ? "small" : "medium"}
        >
          {isProcessing ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <CircularProgress size={18} color="inherit" />
              {isUpdateMode ? 'Processing update...' : 'Processing...'}
            </span>
          ) : (
            'Submit'
          )}
        </Button>
        <Button onClick={onCancel} fullWidth sx={{ mt: 1 }} disabled={isProcessing} size={isMobile ? "small" : "medium"}>Back</Button>
      </form>
    </Box>
  );
}

export default MaidForm;
