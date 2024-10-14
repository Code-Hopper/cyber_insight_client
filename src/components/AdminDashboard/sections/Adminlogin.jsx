import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';  
import "../Admin.scss";

const Adminlogin = () => {

    let [adminLogin, setAdminLogin] = useState({
        id: "",
        password: ""
    });

    let navigate = useNavigate(); // Create navigate instance for redirection

    let handelChange = (e) => {
        let { name, value } = e.target;
        setAdminLogin(prev => ({ ...prev, [name]: value }));
    };

    let handelSubmit = async (e) => {
        e.preventDefault();  

        try {
            // Send admin credentials to backend
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_CALL_ADDRESS}/api/admin/login`,
                data: adminLogin,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle successful login
            console.log('Login successful:', response.data);
            localStorage.setItem('adminToken', response.data.token); // Store token

            // Redirect to dashboard
            navigate('/dashboard'); // Redirect to the admin dashboard

        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='admin-login d-flex justify-content-center align-items-center'>
            <div className='admin-login-container w-25 bg-light p-5'>
                <span className='fw-bolder fs-3 text-center d-block'>Admin Login</span>

                <div className='admin-login-form pt-3'>
                    <form onSubmit={handelSubmit} className='d-flex gap-2 flex-column'>
                        <input
                            className='form-control'
                            onChange={handelChange}
                            type="text"
                            name='id'
                            placeholder='admin id'
                            required
                        />
                        <input
                            className='form-control'
                            onChange={handelChange}
                            type="password"
                            name='password'
                            placeholder='admin password'
                            required
                        />
                        <div className='d-flex gap-2 justify-content-center'>
                            <button type='submit' className='btn btn-success'>Login</button>
                            <button type='reset' className='btn btn-primary'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Adminlogin;