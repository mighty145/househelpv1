import React, { useState } from 'react';
import { Button, TextField, MenuItem, Checkbox, FormControlLabel, Typography, Box, InputLabel, Select, FormControl } from '@mui/material';
import { API_BASE_URL } from './config';

const workTypes = [
  'Maid',
  'Baby care',
  'Cook',
  'Driver',
  'Patient care',
  'Bathroom cleaning',
  'Other',
];


const startTimes = [
  '5:00 AM','6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
];
const endTimes = [
  '6:00 AM','7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM',
  '10:00 PM', '11:00 PM', '24 hours',
];


function MaidForm({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: 'Female',
    workType: ['Maid'],
    location: ['Magarpatta'],
    timeSlots: [
      { startTime: '7:00 AM', endTime: '8:00 AM' }
    ],
    anywhere: false,
    photo: null,
    remarks: '',
    feedback: '',
    available: 1,
  });

  const [photoMsg, setPhotoMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTimeSlotChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const addTimeSlot = () => {
    if (form.timeSlots.length < 4) {
      setForm((prev) => ({
        ...prev,
        timeSlots: [...prev.timeSlots, { startTime: '7:00 AM', endTime: '8:00 AM' }]
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
    const formData = new FormData();
    formData.append('phone', form.phone);
    formData.append('name', form.name);
    formData.append('gender', form.gender);
    formData.append('workType', form.workType.join(','));
    // Send the first time slot for backward compatibility
    formData.append('startTime', form.timeSlots[0].startTime);
    formData.append('endTime', form.timeSlots[0].endTime);
    // Send all time slots as JSON for the available table
    formData.append('timeSlots', JSON.stringify(form.timeSlots));
    formData.append('location', form.location.join ? form.location.join(',') : form.location);
    formData.append('living', form.anywhere ? 1 : 0);
    formData.append('remarks', form.remarks || '');
    formData.append('feedback', form.feedback || '');
    formData.append('available', parseInt(form.available, 10));
    if (form.photo) {
      formData.append('photoPath', form.photo.name);
      formData.append('photo', form.photo);
    } else {
      formData.append('photoPath', '');
    }
    try {
  const response = await fetch(`${API_BASE_URL}/api/maids`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('Registration successful!');
        setForm({
          name: '',
          phone: '',
          workType: [],
          location: [],
          timeSlots: [
            { startTime: '7:00 AM', endTime: '8:00 AM' }
          ],
          anywhere: false,
          photo: null,
          remarks: '',
          feedback: '',
          available: '',
        });
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      alert('Error submitting form.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Maid Registration</Typography>
      <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
      <TextField label="Phone number(10 digit)" name="phone" value={form.phone} onChange={handleChange} fullWidth margin="normal" required />
      <FormControl fullWidth margin="normal">
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Type of work</InputLabel>
        <Select
          multiple
          value={form.workType}
          onChange={handleWorkTypeChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {workTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={form.workType.indexOf(type) > -1} />
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Dynamic Time Slots */}
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Available Time Slots</Typography>
      {form.timeSlots.map((slot, index) => (
        <Box key={index} display="flex" gap={1} alignItems="center" marginY={1}>
          <FormControl fullWidth>
            <InputLabel>Available Start Time</InputLabel>
            <Select
              value={slot.startTime}
              onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
            >
              {startTimes.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Available End Time</InputLabel>
            <Select
              value={slot.endTime}
              onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
            >
              {endTimes.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {form.timeSlots.length > 1 && (
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              onClick={() => removeTimeSlot(index)}
              sx={{ minWidth: 'auto', px: 1 }}
            >
              -
            </Button>
          )}
        </Box>
      ))}
      
      {form.timeSlots.length < 4 && (
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
          {['Magarpatta', 'Amanora', 'Kharadi', 'Hadapsar', 'Manjri', 'No preference', 'Other'].map((loc) => (
            <MenuItem key={loc} value={loc}>
              <Checkbox checked={form.location.indexOf(loc) > -1} />
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <TextField
          label="Remarks"
          name="remarks"
          value={form.remarks || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={3}
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
      <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
      <Button onClick={onBack} fullWidth style={{ marginTop: 8 }}>Back</Button>
    </form>
  );
}

export default MaidForm;
