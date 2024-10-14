import React from 'react'
import CreateCourse from './CreateCourse'

const ManageCourses = () => {
    return (
        <>
            <div className="container-fluid">
                <div className='container'>
                    manage course page
                </div>
                {/* create course sections */}
                <CreateCourse />
            </div>
        </>
    )
}

export default ManageCourses
