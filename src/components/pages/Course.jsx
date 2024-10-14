import React from 'react';
import { useParams, useLocation } from 'react-router-dom';  // Import useLocation to access state
import Header from "../includes/header"
import CoursesRibbion from '../includes/CoursesRibbon';
const Course = () => {
  const { coursetitle } = useParams();  // Extract coursetitle from route params
  const location = useLocation();  // Use location to get the state
  const { course } = location.state || {};  // Extract course from state (if exists)

  return (
    <>

      <Header />

      <CoursesRibbion />

      <div>
        {course ? (
          <>
            <div className='container-fluid p-0 course-heros'>
              <div className='course-img' style={{background:`URL(http://localhost:5501/courseUploads/${course.thumbnail})`}}>
              </div>
              <div className='course-title'>
                <h1>{decodeURIComponent(coursetitle)}</h1>  {/* Display the course title */}
                <h2>Instructor: {course.instructor}</h2>  {/* Display instructor */}
              </div>
            </div>
            <div className='container py-4'>
              {/* Render HTML content from the description */}
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </div>
          </>

        ) : (
          <p>Course data not available.</p>
        )}
      </div>
    </>
  );
};

export { Course };