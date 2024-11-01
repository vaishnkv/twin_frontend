/*
import React, { useState } from 'react';
import './App.css'; // Import custom CSS for styling

const initialStruct = {
  level1: {
    key1: "Numerical",
    key2: "Categorical",
    nestedLevel: {
      key3: "Text",
      nestedLevel2: {
        key4: "Numerical",
        key5: "Categorical"
      }
    }
  },
  level2: {
    key1: "Numerical",
    key2: "Categorical",
    nestedLevel: {
      key3: "Text",
      nestedLevel2: {
        key4: "Numerical",
        key5: "Categorical"
      }
    }
  },
  level3: {
    key1: "Numerical",
    key2: "Categorical",
    nestedLevel: {
      key3: "Text",
      nestedLevel2: {
        key4: "Numerical",
        key5: "Categorical"
      }
    }
  },
  level4: {
    key1: "Numerical",
    key2: "Categorical",
    nestedLevel: {
      key3: "Text",
      nestedLevel2: {
        key4: "Numerical",
        key5: "Categorical"
      }
    }
  },
  level5: {
    key6: "Text",
    key7: "Numerical"
  }
};

const types = ["Numerical", "Categorical", "Text", "Datetime", "Pattern"];

function App() {
  const [struct, setStruct] = useState(initialStruct);
  const [expandedKeys, setExpandedKeys] = useState({});

  // Function to toggle expansion of nested keys
  const toggleExpand = (path) => {
    setExpandedKeys(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // Recursive function to render the struct
  const renderStruct = (currentStruct, path = "") => {
    return Object.keys(currentStruct).map((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = currentStruct[key];

      // Check if the value is nested (a struct)
      const isStruct = typeof value === 'object' && !Array.isArray(value);

      return (
        <div key={currentPath} className="struct-item" style={{ marginLeft: path ? 20 : 0 }}>
          <span onClick={() => isStruct && toggleExpand(currentPath)} style={{ cursor: isStruct ? 'pointer' : 'default' }}>
            <strong>{key}:</strong> {isStruct ? <span className="struct-icon">📂</span> : null}
            {!isStruct && (
              <select
                className="type-select"
                value={value}
                onChange={(e) => handleChange(currentPath, e.target.value)}
              >
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            )}
          </span>
          {isStruct && expandedKeys[currentPath] && (
            <div style={{ marginLeft: 20 }}>
              {renderStruct(value, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  // Function to handle changes in type
  const handleChange = (path, newValue) => {
    const keys = path.split('.');
    const updatedStruct = { ...struct };
    let current = updatedStruct;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = newValue;
    setStruct(updatedStruct);
  };

  // Function to handle submit
  const handleSubmit = () => {
    console.log("Modified Struct:", struct);
  };

  // Function to handle reset
  const handleReset = () => {
    setStruct(initialStruct);
    setExpandedKeys({});
  };

  return (
    <div className="app-container">
      <h1>Encoder Config Editor</h1>
      <div className="struct-container">{renderStruct(struct)}</div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <p className="note">
        Note: We are following a folder structure for nested types.
      </p>
    </div>
  );
}

export default App;
*/


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DataSubmission from './components/DataSubmission'; // Component for the data submission page
import EncoderConfig from './components/EncoderConfig'; // Component for the encoder config page
import SubmittedJobs from './components/SubmittedJobs';
import JobDetails from './components/JobDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/new-job" element={<DataSubmission />} />
        <Route path="/encoder-config" element={<EncoderConfig />} />
        <Route path="/" element={<SubmittedJobs />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect for unknown routes */}
      </Routes>
    </Router>
  );
}

export default App;
