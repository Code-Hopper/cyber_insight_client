import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiCyberdefenders } from "react-icons/si";
import axios from 'axios';
import StudentsTable from './sections/StudentsTable';
import CreateCourse from "./sections/ManageCourses";
import QuizManagement from './sections/QuizManagement';

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
            <div className='container-fluid bg-dark p-2 position-sticky top-0'>
                <div className='container d-flex justify-content-between'>
                    <h1 className='navbar-brand d-flex gap-1 align-items-center'>
                        <SiCyberdefenders className='text-warning' size={"25px"} /> <span className='text-light'>Cyber Insight</span>
                    </h1>
                    <button onClick={logout} className='btn btn-danger'>
                        Logout
                    </button>
                </div>
            </div>


            <ul class="nav my-3 py-5 gap-2 justify-content-center" id="ex1" role="tablist">
                <li class="bg-primary nav-item rounded" role="presentation">
                    <a
                        class="text-light fw-bold nav-link active"
                        data-bs-toggle="tab"
                        href="#manage-student"
                    >
                        Manage Student
                    </a>
                </li>
                <li class="bg-primary nav-item rounded" role="presentation">
                    <a
                        class="text-light fw-bold nav-link"
                        id="ex1-tab-2"
                        data-bs-toggle="tab"
                        href="#manage-courses"
                    >
                        Manage Courses
                    </a>
                </li>
                <li class="bg-primary nav-item rounded" role="presentation">
                    <a
                        class="text-light fw-bold nav-link"
                        id="ex1-tab-3"
                        data-bs-toggle="tab"
                        href="#manage-quiz"
                    >
                        Manage Quiz
                    </a>
                </li>
            </ul>

            {/* Tab content */}
            <div className='tab-content mt-3'>
                <div className='tab-pane fade show active' id='manage-student'>
                    <StudentsTable />
                </div>
                <div className='tab-pane fade' id='manage-courses'>
                    <CreateCourse />
                </div>
                <div className='tab-pane fade' id='manage-quiz'>
                    <QuizManagement />
                </div>
            </div>
        </>
    );
};

export default Dashboard;