import React from 'react'
import "../components.scss"
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className='NotFound-Container d-flex flex-column gap-1'>
            <span className='fw-bolder fs-3'>
                Page Not Found !
            </span>
            <Link to="/" className='btn btn-primary'>
                Home Page
            </Link>
        </div>
    )
}

export { NotFound }
