import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

const Compiler = () => {
  const [code, setCode] = useState('// Write your javascript code here');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    try {
      let token = localStorage.getItem("token");

      // Wrap code inside a JSON object
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/runcode`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        // Send the code inside a JSON object
        data: {
          code: code
        }
      });
      
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error executing the code');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Code Editor</h2>
      <Editor
        height="400px"
        width="800px"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />
      <button className='btn btn-primary' onClick={handleRunCode} style={{ marginTop: '10px' }}>
        Run Code
      </button>
      <div style={{ marginTop: '20px', width: '800px', backgroundColor: '#f5f5f5', padding: '10px' }}>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Compiler;
