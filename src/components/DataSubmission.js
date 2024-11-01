import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataSubmission.css'; // Import the CSS file

function DataSubmission() {
  const [jobName, setJobName] = useState('');
  const [file, setFile] = useState(null);
  const [integerValue, setIntegerValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('job_name', jobName);
    formData.append('input_file', file);
    formData.append('num_of_synthetic_samples', integerValue);

    try {
      const response = await fetch('http://localhost:5001/data_submit', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        alert('Server unreachable');
        return;
      }

      const data = await response.json();
      localStorage.setItem('struct', JSON.stringify(data)); 
      navigate('/encoder-config'); 

    } catch (error) {
      alert('Server unreachable');
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setJobName('');
    setFile(null);
    setIntegerValue('');
  };

  // const handleHeadClick = () => {
  //   navigate('/'); // Redirect to root route
  // };

  return (
    <div className="app-container">
      <h1>Submit New Job </h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Job Name:
          <input
            type="text"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          File Upload:
          <input
            type="file"
            accept=".csv,.json,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Number of Synthetic Samples:
          <input
            type="number"
            value={integerValue}
            onChange={(e) => setIntegerValue(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <div className="button-container">
          <button type="submit" className="submit-button">Next</button>
          <button type="button" onClick={handleReset} className="reset-button">Reset</button>
        </div>
      </form>
    </div>
  );
}

export default DataSubmission;
