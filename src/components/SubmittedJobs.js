import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubmittedJobs.css';

function SubmittedJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs from backend
    fetch('http://localhost:5001/submitted_jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error("Error fetching jobs:", error));
  }, []);
  
  const handleNewJobClick = () => {
    // Navigate to new job page
    navigate('/new-job');
  };

  // const handleHeadClick = () => {
  //   navigate('/'); // Redirect to root route
  // };

  const handleJobClick = (jobId) => {
    // Navigate to job details page with the jobId
    console.log("User name is:", jobId);
    navigate(`/job-details/${jobId}`);
  };

  return (
    <div className="jobs-container">
      <h1>CloneLM</h1>
      <button className="new-job-button" onClick={handleNewJobClick}>
        New Job
      </button>
      <h2>Jobs so far</h2>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Status</th>
            <th>Created On</th>
            <th>Completed On</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.job_id}>
              <td>
                {job.status === "success" ? (
                  <span
                    className="clickable"
                    onClick={() => handleJobClick(job.job_id)}
                  >
                    {job.job_title}
                  </span>
                ) : (
                  job.job_title
                )}
              </td>
              <td>{job.status}</td>
              <td>{job.created_on}</td>
              <td>{job.completed_on || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmittedJobs;
