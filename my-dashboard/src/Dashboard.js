import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [cpuUtilization, setCpuUtilization] = useState(null);
  const [memoryUtilization, setMemoryUtilization] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:3001/api/metrics')
        .then(response => {
            
          console.log(response)
          setCpuUtilization(response.data.cpuUtilization.toFixed(2));
          setMemoryUtilization(response.data.memoryUtilization.toFixed(2));
        })
        .catch(error => {
          console.error(error);
        });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
    <div className="card cpu-card">
      <div className="card-header">CPU Utilization</div>
      <div className="card-body">{cpuUtilization}%</div>
    </div>
    <div className="card memory-card">
      <div className="card-header">Memory Utilization</div>
      <div className="card-body">{memoryUtilization}%</div>
    </div>
  </div>
  );
}

export default Dashboard;
