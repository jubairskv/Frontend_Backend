// CSVDownloadButton.js

import React from 'react';
import axios from 'axios';

function CSVDownloadButton() {
  const handleDownload = async () => {
    try {
      await axios.get('/api/getEmployees');
    } catch (error) {
      // Handle errors
    }
  };

  return (
    <button
    onClick={handleDownload}
    style={{
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'block',
      margin: '20px auto',
    }}
  >
    Download Employee List as CSV
  </button>
  
  );
}

export default CSVDownloadButton;
