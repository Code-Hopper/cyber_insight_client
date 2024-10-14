import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';  // Import axios for making API calls
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';  // Import Link for navigation

const CoursesRibbion = () => {
  const [courses, setCourses] = useState([]);  // State to hold the courses
  const [error, setError] = useState('');      // State to handle any errors
  const containerRef = useRef(null);  // Ref for the scrollable container

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_CALL_ADDRESS}/admin/dashboard/allCourses`);
        setCourses(response.data.allCourses);  // Set the courses from the response
      } catch (err) {
        setError('Unable to fetch courses');  // Handle any errors
        console.error(err);
      }
    };
    fetchCourses();
  }, []);  // Empty dependency array ensures this runs only once

  // Scroll left (previous)
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  // Scroll right (next)
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className='courses-ribbion bg-light container-fluid shadow-lg position-relative z-3'>
      <div className='courses-ribbion-button w-100 d-flex justify-content-between position-absolute start-50 top-50 translate-middle'>
        <button className='scroll-btn btn btn-warning py-0 rounded-0 fw-bolder' onClick={scrollLeft}>
          <MdKeyboardArrowLeft />
        </button>
        <button className='scroll-btn btn btn-warning py-0 rounded-0 fw-bolder' onClick={scrollRight}>
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div
        ref={containerRef}  // Attach the ref to the container
        className='px-5 courses-list-container d-flex gap-2 flex-nowrap position-relative z-3'
        style={{ overflowX: 'hidden', whiteSpace: 'nowrap' }}  // Adjust padding to avoid button overlap
      >
        {error && <span>{error}</span>} {/* Display error if any */}

        {/* Courses mapped */}
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <Link 
              key={index}
              to={`/course/${encodeURIComponent(course.title)}`}  // Set URL to include the course title
              state={{ course }}  // Pass the course object as state
              className='fw-bolder px-3 nav-link'
            >
              {course.title}
            </Link>
          ))
        ) : (
          <span>Loading courses...</span>
        )}
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .courses-list-container::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .courses-list-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default CoursesRibbion;