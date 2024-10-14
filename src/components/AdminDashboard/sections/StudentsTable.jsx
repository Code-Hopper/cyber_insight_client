import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentsTable = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem('adminToken');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/students`, {
                    headers: {
                        'Authorization': token
                    }
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [navigate]);

    // Handle student deletion
    const deleteStudent = async (id) => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            await axios.delete(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/studentsdelete/${id}`, {
                headers: {
                    'Authorization': token
                }
            });

            // Update the state to remove the deleted student
            setStudents(students.filter(student => student._id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

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
                            <td>
                                <button
                                    className='btn btn-danger py-0 px-2'
                                    onClick={() => deleteStudent(student._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentsTable;