import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from './config';

function FeedbackForm({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Thank you for your feedback!',
          severity: 'success'
        });
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to submit feedback',
        severity: 'error'
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
  <Dialog open={open} onClose={onClose} maxWidth={isMobile ? "xs" : "sm"} fullWidth>
        <DialogTitle>Send Feedback</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ px: isMobile ? 1 : 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                name="email"
                label="Your Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                name="phone"
                label="Your Phone (optional)"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                fullWidth
                required
                size={isMobile ? "small" : "medium"}
              />
              <TextField
                name="message"
                label="Your Feedback"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                fullWidth
                required
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ flexDirection: isMobile ? "column" : "row", gap: isMobile ? 1 : 2 }}>
            <Button onClick={onClose} size={isMobile ? "small" : "medium"}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" size={isMobile ? "small" : "medium"}>
              Submit Feedback
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FeedbackForm;