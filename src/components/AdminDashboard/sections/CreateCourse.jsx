import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';  // Import ReactQuill
import 'react-quill/dist/quill.snow.css';  // Import the styles for ReactQuill

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');  // State to hold HTML content
    const [instructor, setInstructor] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create form data to send with the request
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);  // Send the HTML content as description
        formData.append('instructor', instructor);
        formData.append('thumbnail', thumbnail); // Append the image file

        try {
            let adminToken = localStorage.getItem("adminToken")
            const response = await axios({
                url: `${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/createCourse`,
                method: "POST",
                headers: {
                    'Authorization': adminToken,
                    'Content-Type': 'multipart/form-data' // Set proper content type
                },
                data: formData
            });
            setMessage('Course created successfully');
            console.log(response.data);
        } catch (error) {
            setMessage('Error creating course');
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
            <div className="container">
                <h2>Create a New Course</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Course Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        {/* Replace textarea with ReactQuill */}
                        <ReactQuill 
                            value={description} 
                            onChange={setDescription} 
                            theme="snow" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Instructor</label>
                        <input
                            type="text"
                            className="form-control"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Thumbnail Image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setThumbnail(e.target.files[0])}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Course</button>
                </form>

                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default CreateCourse;