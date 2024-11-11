import React, { useState, useEffect } from 'react'
import Header from '../includes/header'
import PleaseLogin from '../sections/PleaseLogin'
import { useNavigate } from 'react-router-dom'
import { authUser } from '../auth'
import { Link } from 'react-router-dom'
import News from '../sections/News'

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
            // navigate("/")
        }
    }

    useEffect(() => {
        // validate before giving access to dashboard
        validateAdmin()
    }, [])

    return (
        <>
            <Header />
            {/* please login message pop up */}
            {/* only on this page because when user will be redirected they will land on this page where please login popup will appear */}

            <PleaseLogin />
            {
                studentDataTools ? ( // Check if studentDataTools is available, not setStudentDataTools
                    <div className='container-fluid'>

                        <News />
                        <div className=''>
                            <div className='tools-container-complete py-5'>
                                <div className='py-4 d-flex flex-column gap-4 justify-content-center'>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool tool-compiler'>
                                        <span className='fw-bold fs-1 text-warning'>Code Compiler</span>
                                        <p className=''>
                                            Start practicing coding with our free code compiler.
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/code-compiler`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool hasing-tool'>
                                        <span className='fw-bold fs-1 text-warning'>Quick Quiz</span>
                                        <p className=''>
                                            Take the quiz learn more. 
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/quick-quiz`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool hasing-tool'>
                                        <span className='fw-bold fs-1 text-warning'>Hasing Tool</span>
                                        <p className=''>
                                            Hash your important data to make it the most secure.
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/hasing-tool`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool tool-keylogger'>
                                        <span className='fw-bold fs-1 text-warning'>Key-Logger Script</span>
                                        <p>
                                            Start logging user data with special keylogger web scripts.
                                        </p>
                                        {/* adding a key based API call so that any random user may not access tools */}
                                        <Link className='btn btn-primary' to={`/tools/${studentDataTools._id}/keylogger`}>
                                            Check
                                        </Link>
                                    </div>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool tool-password-manager'>
                                        <span className='fw-bold fs-1 text-warning'>Learn to Code</span>
                                        <p className=''>
                                            Specialized course content for learning coding languages.
                                        </p>
                                        <Link className='btn btn-primary' to="/">
                                            Check
                                        </Link>
                                    </div>
                                    <div style={{ padding: "3rem 25%" }} className='shadow rounded tool tool-password-manager'>
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
                    <div className='container text-center'>
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
