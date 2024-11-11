import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

const Compiler = () => {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleRunCode = async () => {
    try {
      let token = localStorage.getItem("token");

      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/runcode`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        data: {
          code: code,
          language: language // Include selected language
        }
      });

      setOutput(response.data.output);
      console.log(response.data.output);
    } catch (error) {
      setOutput('Error executing the code');
    }
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setCode('// Write your ' + e.target.value + ' code here');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Multi-Language Code Editor</h2>
      <select onChange={handleLanguageChange} value={language} style={{ marginBottom: '10px' }}>
        <option value="javascript">JavaScript</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        {/* Add more languages as needed */}
      </select>
      <Editor
        height="400px"
        width="800px"
        language={language}
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