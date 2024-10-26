import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const Keylogger = () => {
  let { id } = useParams();
  const [loggedKeys, setLoggedKeys] = useState([]);

  useEffect(() => {
    const fetchLoggedKeys = async () => {
      try {
        const response = await axios.get(`http://localhost:5501/${id}/getkeyloggerdata`);
        setLoggedKeys(response.data); // Store fetched keys in state
      } catch (error) {
        console.error("Error fetching logged keys:", error);
      }
    };

    fetchLoggedKeys();
  }, [id]);

  return (
    <div>
      <h1>Keylogger Data</h1>
      <div className='container'>
        <ul className='d-flex flex-wrap gap-2' style={{listStyle:"none"}}>
          {loggedKeys.map((key, index) => (
            <li key={index} className='nav-items shadow p-2'>{JSON.stringify(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Keylogger;