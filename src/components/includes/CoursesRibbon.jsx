import React, { useRef } from 'react';

import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";


const CoursesRibbion = () => {
  let courses = ["course 1", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course", "course"];
  
  const containerRef = useRef(null);  // Create a ref for the scrollable container

  // Function to scroll left (previous)
  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  // Function to scroll right (next)
  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className='courses-ribbion bg-light container-fluid shadow-lg position-relative z-3'>
      <div className='courses-ribbion-button w-100 d-flex justify-content-between position-absolute start-50 top-50 translate-middle '>
        <button className='scroll-btn btn btn-warning py-0 rounded-0 fw-bolder' onClick={scrollLeft}><MdKeyboardArrowLeft/></button>
        <button className='scroll-btn btn btn-warning py-0 rounded-0 fw-bolder' onClick={scrollRight}><MdKeyboardArrowRight/></button>
      </div>
      <div
        ref={containerRef}  // Attach the ref to the container
        className='px-5 courses-list-container d-flex gap-2 flex-nowrap'
        style={{ overflowX: 'hidden', whiteSpace: 'nowrap'}}  // Adjust padding to avoid button overlap
      >
        {/* courses mapped */}
        {
          courses.map((course, index) => {
            return (
              <span key={index} className='fw-bolder px-3'>{course}</span>
            );
          })
        }
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
}

export default CoursesRibbion;
