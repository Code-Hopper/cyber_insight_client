import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCourse from './CreateCourse';
const ManageCourses = () => {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');

    // Fetch all courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/allCourses`);
                setCourses(response.data.allCourses);
            } catch (err) {
                setError('Unable to fetch courses');
                console.error(err);
            }
        };
        fetchCourses();
    }, []);

    // Delete course by ID
    const handleDelete = async (courseId) => {
        let adminToken = localStorage.getItem("adminToken")
        try {
            await axios({
                url: `${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/coursedelete/${courseId}`,
                method: "DELETE",
                headers: {
                    'Authorization' : adminToken
                }
            });
            setCourses(courses.filter(course => course._id !== courseId));  // Remove the deleted course from the UI
        } catch (err) {
            setError('Unable to delete the course');
            console.error(err);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <CreateCourse />
                <div className="container">
                    <h1>Manage Courses</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="course-list">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course._id} className="course-item d-flex justify-content-between align-items-center">
                                    <span>{course.title}</span>
                                    <button className="btn btn-danger" onClick={() => handleDelete(course._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No courses available.</p>
                        )}
                    </div>
                </div>
                {/* Add CreateCourse component */}
            </div>
        </>
    );
};

export default ManageCourses;
