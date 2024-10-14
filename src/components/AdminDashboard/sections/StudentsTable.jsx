import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('adminToken'); // Get the token from localStorage

            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                // Fetch students from the backend
                const response = await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/students`,
                    headers: {
                        'Authorization': `Bearer ${token}` // Send the token in headers for authentication
                    }
                });

                setStudents(response.data); // Set students data

            } catch (error) {
                console.error('Error fetching students:', error);
                // navigate('/login'); // Redirect to login if token is invalid
            }
        };

        fetchStudents();
    }, [navigate]);

    return (
        <div className='p-5'>
            <span className='fs-3 fw-semibold'>Students List</span>
            <table className="table">
                <thead>
                    <tr className='table-dark'>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Registration No</th>
                        <th>Status</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Current Education</th>
                        <th>Interest Topics</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.dob}</td>
                            <td>{student.registrationNo}</td>
                            <td>{student.status}</td>
                            <td>{student.phone}</td>
                            <td>{student.email}</td>
                            <td>{student.currentEducation}</td>
                            <td>{student.intresetTopics}</td>
                            <td><button className='btn btn-danger py-0 px-2'>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;