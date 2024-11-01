import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/job_details/${id}`)
      .then(response => response.json())
      .then(data => setJobDetails(data))
      .catch(error => console.error("Error fetching job details:", error));
  }, [id]);

  // const handleHeadClick = () => {
  //   navigate('/'); // Redirect to root route
  // };

  const handleDownload = () => {
    fetch(`http://localhost:5001/download/${id}`)
      .then(response => {
        if (response.ok) {
          return response.blob(); // Get the response as a Blob
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `job_${id}.zip`; // Set the filename
        document.body.appendChild(a);
        a.click(); // Programmatically click the link to trigger download
        a.remove(); // Clean up
      })
      .catch(error => console.error("Error downloading file:", error));
  };


  if (!jobDetails) return <p>Loading job details...</p>;

  return (
    <div className="app-container">
      <h1>{jobDetails.job_title}</h1>
      <div className="form-container">
        <p className="form-label"><strong>Status:</strong> {jobDetails.status}</p>
        <p className="form-label"><strong>Created On:</strong> {jobDetails.created_on}</p>
        <p className="form-label"><strong>Completed On:</strong> {jobDetails.completed_on || "N/A"}</p>
        <p className="form-label"><strong>Details:</strong> {jobDetails.details}</p>
        <p className="form-label clickable" onClick={handleDownload} style={{ cursor: 'pointer', color: '#1e90ff' }}>
          Download
        </p>
      </div>
    </div>
  );
}

export default JobDetails;
