import React, { useState, useEffect } from 'react'
import Header from '../includes/header'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../auth'
import { Link } from 'react-router-dom'

import Compiler from '../sections/Compiler'

const Tools = () => {
    let navigate = useNavigate()

    // Initialize state as null to handle undefined scenarios
    let [studentDataTools, setStudentDataTools] = useState(null)

    let validateAdmin = async () => {
        try {
            let validUserTools = await authUser()

            if (!validUserTools) {
                throw new Error("No admin data received from backend!")
            }

            setStudentDataTools(validUserTools)
            // console.log(studentDataTools)
        } catch (err) {
            console.log("Unable to validate user!", err)
            navigate("/")
        }
    }

    useEffect(() => {
        // validate before giving access to dashboard
        validateAdmin()
    }, [])

    return (
        <>
            <Header />
            {
                studentDataTools ? ( // Check if studentDataTools is available, not setStudentDataTools
                    <div className='container-fluid'>
                        <div className='container'>
                            <div className='tools-container-complete py-5'>
                                <span className='fw-semibold fs-2 text-center'> Use Our Tools</span>
                                <div className='row py-4 gap-3 justify-content-center'>
                                    <div className='col-5 shadow p-2 tool tool-compiler'>
                                        <span className='fw-bold fs-1 text-warning'>Code Compiler</span>
                                        <p>
                                            Start practicing coding with our free code compiler.
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/code-compiler`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div className='col-5 shadow p-2 tool tool-keylogger'>
                                        <span className='fw-bold fs-1 text-warning'>Key-Logger Script</span>
                                        <p>
                                            Start logging user data with special keylogger web scripts.
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/keylogger`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div className='col-5 shadow p-2 tool tool-password-manager'>
                                        <span className='fw-bold fs-1 text-warning'>Learn to Code</span>
                                        <p>
                                            Specialized course content for learning coding languages.
                                        </p>
                                        <button className='btn btn-primary'>Check</button>
                                    </div>
                                    <div className='col-5 shadow p-2 tool tool-password-manager'>
                                        <span className='fw-bold fs-1 text-warning'>Password Manager</span>
                                        <p>
                                            Secure and encrypted password manager for all your needs.
                                        </p>
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/password-manager`}>
                                            Check
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='container'>
                        <span className='fw-bolder fs-2 text-danger'>
                            Tools are not available for you!
                        </span>
                    </div>
                )
            }
        </>
    )
}

export default Tools
