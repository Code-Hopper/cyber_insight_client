import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCyberdefenders } from "react-icons/si";
import axios from 'axios';
import StudentsTable from './sections/StudentsTable';
import CreateCourse from "./sections/ManageCourses";

const Dashboard = () => {
    let navigate = useNavigate();
    const [isManagingCourses, setIsManagingCourses] = useState(false); // State to toggle views

    // Check for token and validate on component mount
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('adminToken'); // Get the token from localStorage

            if (!token) {
                // If no token, redirect to login
                navigate('/admin');
                return;
            }

            try {
                // Validate the token by sending a request to the backend
                const response = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard`, // The endpoint to validate token
                    headers: {
                        'Authorization': token // Attach token to the headers
                    }
                });

                // Optionally handle any data from the response
                console.log('Dashboard data:', response.data);

            } catch (error) {
                // If token is invalid or expired, redirect to login
                console.error('Token validation failed:', error.response ? error.response.data : error.message);
                navigate('/admin'); // Redirect to login if token is not valid
            }
        };

        verifyToken();
    }, [navigate]); // Add navigate as a dependency to prevent linting errors

    let logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    };

    // Toggle between viewing all courses and managing courses
    const toggleCourseManagement = () => {
        setIsManagingCourses(prevState => !prevState);
    };

    return (
        <>
            <div className='container-fluid bg-dark p-2'>
                <div className='container d-flex justify-content-between'>
                    <h1 className='navbar-brand d-flex gap-1 align-items-center'>
                        <SiCyberdefenders className='text-warning' size={"25px"} /> <span className='text-light'>Cyber Insight</span>
                    </h1>
                    <button onClick={logout} className='btn btn-danger'>
                        Logout
                    </button>
                </div>
            </div>

            <div className='text-center py-3'>
                <button onClick={toggleCourseManagement} className='btn btn-primary'>
                    {isManagingCourses ? 'View All Students' : 'Manage Courses'}
                </button>
            </div>

            {/* Conditionally render either the StudentsTable or the CreateCourse component */}
            {isManagingCourses ? <CreateCourse /> : <StudentsTable />}
        </>
    );
};

export default Dashboard;