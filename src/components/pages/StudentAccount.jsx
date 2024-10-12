import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../includes/header.jsx'
import { authUser } from '../auth.js'
import PleaseLogin from '../sections/PleaseLogin.jsx'


const StudentAccount = () => {

    let navigate = useNavigate()

    let [studentData, setStudentData] = useState()

    let [pleaseLoginBoolean, setPleaseLoginBoolean] = useState(false)

    let validateAdmin = async () => {
        try {

            let validUser = await authUser()

            if (!validUser) {
                throw ("not got admin data from backend !")
            }

            // console.log(validUser)

            setStudentData(validUser)

            // console.log(studentData)

        } catch (err) {
            console.log("unable to validate user ! ", err)
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

            <PleaseLogin openPleaseLogin={pleaseLoginBoolean} openPleaseLoginHandler={setPleaseLoginBoolean} />

            <div className='container-fluid'>
                <div className='container p-5 d-flex justify-content-center'>
                    {
                        studentData ?
                            <div className='student-profile-container shadow-lg p-5'>
                                <div>
                                    {/* map student info here */}
                                    <div className='row'>
                                        <div className='col'>Name</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'> {studentData.name} </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Phone</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'> {studentData.phone} </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Status</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'> {studentData.status} </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Email</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'> {studentData.email} </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Current Education</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'> {studentData.currentEducation} </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>Update Password</div>
                                        <div className='col-1'> : </div>
                                        <div className='col'><input className='form-control' type="text" placeholder='Enter New Password' /></div>
                                    </div>
                                </div>
                                <div className=' mt-3 d-flex justify-content-center gap-2'>
                                    <button type='button' className='btn btn-success' disabled>Update Password</button>
                                    <button type='button' className='btn btn-danger'>Delete This Account</button>
                                </div>
                            </div>
                            :
                            <>
                            <h1>No Data Available</h1>
                            </>
                    }

                </div>
            </div>
        </>
    )
}

export default StudentAccount
