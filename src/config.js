// API Configuration
// Automatically detect if running on localhost or needs network IP for mobile access
const getApiBaseUrl = () => {
  // Check if we're running in production
  if (process.env.NODE_ENV === 'production') {
    // Use production API endpoint - your deployed Azure backend URL
    const prodUrl = process.env.REACT_APP_API_URL || 'https://maidbackend-emd3gd5ae6eghaf0.eastasia-01.azurewebsites.net';
    console.log('Production mode - using API URL:', prodUrl);
    return prodUrl;
  }
  
  // Check if we're running on localhost
  const isLocalhost = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname === '';
  
  if (isLocalhost) {
    // Use localhost when accessed from the same machine
    console.log('Development mode - using localhost');
    return 'http://localhost:80';
  } else {
    // Use the actual network IP when accessed from mobile devices
    // Make sure your backend server is running on this IP and port 80
    console.log('Development mode - using network IP');
    return 'http://192.168.1.3:80';
  }
};

export const API_BASE_URL = getApiBaseUrl();

// For debugging - you can check what URL is being used
console.log('API_BASE_URL:', API_BASE_URL);