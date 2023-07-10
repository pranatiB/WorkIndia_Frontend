//this solution is purely based on the figma screenshot provided
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [candidateData, setCandidateData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      //Axios gets the response of API through API_endpoint URL
      const response = await axios.get('https://run.mocky.io/v3/ae511409-8c0e-40ed-9336-aebcb602823d');
     // Store the retrieved data in the state variable
      setCandidateData(response.data.data);
    } catch (error) {
      console.error('Error fetching candidate data:', error);
    }
  };

  const renderCandidateDetails = (candidate) => {
    // Array of details to be rendered for each candidate
    const details = [
      { value: candidate.last_updated_at }, // Last updated timestamp
      { value: candidate.location }, // Candidate's location
      { value: candidate.gender } // Candidate's gender
    ];
  
    // Render each detail with an icon and label
    return details.map((detail, index) => (
      <React.Fragment key={index}>
        {/* Icon */}
        <img src="https://via.placeholder.com/18x18" alt="icon" />
  
        {/* Detail label and value */}
        <p>
          <strong>{detail.label}</strong> {detail.value}
        </p>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <h1>Candidate Application Status</h1>
       {/* Columns for Applied, Accepted, and Rejected candidates  */}
      <div className="columns">
        <div className="column">
          <h2>Applied</h2>
          {candidateData
            .filter((candidate) => candidate.status === 'Applied')
            .map((candidate) => (
              <div key={candidate.id} className="candidate-box">
                <p>{candidate.name}</p>
                {renderCandidateDetails(candidate)}
              </div>
            ))}
        </div>
        <div className="column">
          <h2>Accepted</h2>
          {candidateData
            .filter((candidate) => candidate.status === 'Accepted')
            .map((candidate) => (
              <div key={candidate.id} className="candidate-box">
                <p>{candidate.name}</p>
                {renderCandidateDetails(candidate)}
              </div>
            ))}
        </div>
        <div className="column">
          <h2>Rejected</h2>
          {candidateData
            .filter((candidate) => candidate.status === 'Rejected')
            .map((candidate) => (
              <div key={candidate.id} className="candidate-box">
                <p>{candidate.name}</p>
                {renderCandidateDetails(candidate)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
