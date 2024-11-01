import React, { useState, useEffect } from 'react';
import './EncoderConfig.css'; // Custom CSS for styling

const types = ["Numerical", "Categorical", "Text", "Datetime", "Pattern"];

function EncoderConfig() {
  const [struct, setStruct] = useState({});
  const [expandedKeys, setExpandedKeys] = useState({});

  useEffect(() => {
    const storedStruct = localStorage.getItem('struct');
    if (storedStruct) {
      setStruct(JSON.parse(storedStruct));
    }
  }, []);

  const toggleExpand = (path) => {
    setExpandedKeys(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  // const handleHeadClick = () => {
  //   navigate('/'); // Redirect to root route
  // };

  const renderStruct = (currentStruct, path = "") => {
    return Object.keys(currentStruct).map((key) => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = currentStruct[key];
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

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5001/encoder_config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(struct),
      });

      if (!response.ok) {
        alert('Server unreachable');
        return;
      }

      const data = await response.json();
      localStorage.setItem('modifiedStruct', JSON.stringify(data)); // Store modified struct in local storage
      // Optionally navigate back to home or handle it as needed
      window.location.href = '/'; // Redirect to the home page

    } catch (error) {
      alert('Server unreachable');
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Encoder Config Editor</h1>
      <div className="struct-container">{renderStruct(struct)}</div>
      <div className="button-container">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => setStruct(JSON.parse(localStorage.getItem('struct')))}>Reset</button>
      </div>
      <p className="note">Note: We are following a folder structure for nested types.</p>
    </div>
  );
}

export default EncoderConfig;
