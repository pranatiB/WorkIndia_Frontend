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
      const response = await axios.get('http://localhost:3500/data');
      setCandidateData(response.data);
    } catch (error) {
      console.error('Error fetching candidate data:', error);
    }
  };

  const moveCandidate = async (candidateId, newStatus) => {
    try {
      const updatedCandidateData = candidateData.map((candidate) => {
        if (candidate.id === candidateId) {
          return { ...candidate, status: newStatus };
        }
        return candidate;
      });

      setCandidateData(updatedCandidateData);

      // Update the candidate status in the API or database
      await axios.put(`http://localhost:3500/data/${candidateId}`, { status: newStatus });
    } catch (error) {
      console.error('Error updating candidate status:', error);
    }
  };

  const handleMove = (candidateId, newStatus) => {
    moveCandidate(candidateId, newStatus);
  };

  return (
    <div>
      <h1>Candidate Application Status</h1>
      <div className="columns">
        <div className="column">
          <h2>Applied</h2>
          {candidateData
            .filter((candidate) => candidate.status === 'Applied')
            .map((candidate) => (
              <div key={candidate.id} className="candidate-box">
                <p>{candidate.name}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /> <p>{candidate.last_updated_at}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.location}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.gender}</p>
                <div className="move-buttons">
                  <button onClick={() => handleMove(candidate.id, 'Accepted')}>
                    Move to Accepted
                  </button>
                  <button onClick={() => handleMove(candidate.id, 'Rejected')}>
                    Move to Rejected
                  </button>
                </div>
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
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.last_updated_at}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.location}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.gender}</p>
                <div className="move-buttons">
                  <button onClick={() => handleMove(candidate.id, 'Rejected')}>
                    Move to Rejected
                  </button>
                </div>
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
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.last_updated_at}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.location}</p>
                <img src="https://via.placeholder.com/18x18" alt="icon" /><p>{candidate.gender}</p>
                <div className="move-buttons">
                  <button onClick={() => handleMove(candidate.id, 'Accepted')}>
                    Move to Accepted
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
