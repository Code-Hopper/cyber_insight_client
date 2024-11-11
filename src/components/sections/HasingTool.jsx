import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const HasingTool = () => {
    const [text, setText] = useState('');
    const [hashedText, setHashedText] = useState('');
    const [verifyText, setVerifyText] = useState('');
    const [isMatch, setIsMatch] = useState(null);
    const [checkAgainst, setCheckAgainst] = useState('');

    const handleHash = async () => {
        // Generate salt and hash the input text
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(text, salt);
        setHashedText(hash);
        setIsMatch(null); // Reset the match status when new hash is generated
    };

    const handleVerify = async () => {
        // Compare the input text with the hash
        const match = await bcrypt.compare(verifyText, checkAgainst);
        setIsMatch(match);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2>Encrypt and Verify Your Text with Bcrypt</h2>
            <div className='d-flex flex-column gap-5'>
                {/* Column for Hashing */}
                <div className='shadow p-3 rounded'>
                    <h3>Encrypt Text</h3>
                    <textarea
                        className='form-control'
                        placeholder="Enter text to hash"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="3"
                        cols="30"
                        style={{ width: '100%' }}
                    />
                    <button className='btn btn-success' onClick={handleHash} style={{ marginTop: '10px' }}>Hash Text</button>
                    {hashedText && (
                        <div>
                            <h4>Hashed Text:</h4>
                            <p>{hashedText}</p>
                        </div>
                    )}
                </div>

                {/* Column for Verifying Hash */}
                <div className='shadow p-3 rounded'>
                    <h3>Verify Text</h3>
                    <input
                        placeholder='enter hash to check'
                        type="text"
                        className='form-control' value={checkAgainst}
                        onChange={(e) => setCheckAgainst(e.target.value)}
                    />
                    <textarea
                        className='form-control'
                        placeholder="Enter text to verify"
                        value={verifyText}
                        onChange={(e) => setVerifyText(e.target.value)}
                        rows="3"
                        cols="30"
                        style={{ width: '100%' }}
                    />
                    <button className='btn btn-warning' onClick={handleVerify} style={{ marginTop: '10px' }}>Verify Text</button>
                    {isMatch !== null && (
                        <div>
                            <h4>Verification Result:</h4>
                            <p>{isMatch ? "Text matches hash!" : "Text does not match hash."}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HasingTool;
