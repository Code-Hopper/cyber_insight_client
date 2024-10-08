import React, { useState } from 'react'
import axios from "axios"

import { SiCyberdefenders } from "react-icons/si";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


const LoginRegisterPopUp = (props) => {

  let navigate = useNavigate()

  let [showPassword, setShowPassword] = useState(false)

  // register user 

  let [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    currentEducation: "",
    intrestedTopics: ""
  })

  let [studentLogin, setStudentLogin] = useState({
    email: "",
    password: ""
  })

  let [registrationStatusMessage, setRegistrationStatusMessage] = useState(false)

  let [loginStatusMessage, setLoginStatusMessage] = useState(false)

  let handelStudentInputChange = (e) => {
    let { name, value } = e.target

    // Format the date if the field is 'dob'
    if (name === 'dob') {
      // Ensure date format is 'YYYY-MM-DD'
      const formattedDate = new Date(value).toISOString().split('T')[0];
      value = formattedDate;
    }

    setStudent((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  let handelRegisterStudent = async (e) => {
    e.preventDefault()
    let result;
    try {

      console.log(student)

      result = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/action/registerStudent`,
        data: student
      })

      console.log("posted !", result)

      if (result.status !== 202) {
        throw ("err while registering student !")
      }

      console.log(result.data.message)

      setRegistrationStatusMessage(result.data.message)

      setStudent({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        currentEducation: "",
        intrestedTopics: ""
      })

    } catch (err) {
      console.log("error while register student !", err)
      console.log(err.response)
      setRegistrationStatusMessage(err.response.data.problem);
      setStudent({
        name: "",
        email: "",
        phone: "",
        dob: "",
        password: "",
        currentEducation: "",
        intrestedTopics: ""
      })
    }
  }

  let handelLoginChange = (e) => {
    let { name, value } = e.target
    setStudentLogin((prev) => {
      return ({
        ...prev, [name]: value
      })
    })
  }

  let handelLoginFormSubmit = async (e) => {
    e.preventDefault()

    let result

    try {

      result = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_CALL_ADDRESS}/action/loginstudent`,
        data: studentLogin
      })

      if (result.status !== 202) {
        throw ("err in student loginin")
      }

      setLoginStatusMessage(result.data.message)

      localStorage.setItem("token", result.data.token)

      // redirect user to account page

      navigate("/my-account")

    } catch (err) {
      console.log("err in student login ! ", err)
      console.log(err.response)
      setLoginStatusMessage(err.response.data.problem)
    }
  }

  return (
    <>
      <div id='loginRegisterPopUp' className={props.openPopUp ? '' : 'collapse'}>
        <div className='student-login-register-form bg-warning p-3 text-center'>
          <div className='login-register-pop-header'>
            <span className='fw-bold'>Welcome to <SiCyberdefenders /> Cyber Insight</span>
            <div className='position-absolute top-0 start-100 translate-middle'>
              <button className='btn btn-danger rounded-circle py-2' onClick={() => { props.setOpenPopUp(false) }}>
                <RxCross2 className='text-light' />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className='login-register-tabs-buttons'>
            <ul className="nav nav-tabs p-2 d-flex justify-content-center gap-2">
              <li className="nav-item">
                <button data-bs-toggle="tab" data-bs-target="#pop-up-login" className='btn fw-semibold active'>Login</button>
              </li>
              <li className="nav-item">
                <button data-bs-toggle="tab" data-bs-target="#pop-up-register" className='btn btn-success fw-semibold'>Register</button>
              </li>
            </ul>
          </div>

          {/* tabs content */}
          <div className='login-register-tabs-content'>
            <div className="tab-content px-5 py-3">
              <div id="pop-up-login" className="tab-pane fade show active">
                <h5 className='fw-thin text-center mb-5'>Welcome Back !</h5>
                <div>
                  <form className='student-login-form' onSubmit={handelLoginFormSubmit}>
                    <input onChange={handelLoginChange} type="text" className='student-login-form-input' placeholder='User Name' name='email' value={studentLogin.email} required />
                    <div className='student-login-password d-flex align-items-center position-relative'>
                      <input onChange={handelLoginChange} type={showPassword ? "text" : "password"} className='student-login-form-input flex-grow-1' placeholder='Password' name='password' value={studentLogin.password} required />

                      <button type='button' className='btn position-absolute end-0 bottom-0 px-0' onClick={() => { setShowPassword(!showPassword) }}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <div className='d-flex flex-column justify-content-center align-items-center'>
                      <div className='d-flex gap-1'>
                        <button type='submit' className='btn btn-primary'>submit</button>
                        <button type='reset' className='btn btn-dark'>reset</button>
                      </div>
                      <span className='fw-semibold d-flex align-items-center gap-1'>Don't have an account?
                        <button type='button' className='btn p-0 text-primary fw-bolder' data-bs-toggle="tab" data-bs-target="#pop-up-register"> Register!</button>
                      </span>
                    </div>
                  </form>
                </div>

                {/* message for success or error */}
                {
                  loginStatusMessage ?
                    <div className='alert alert-warning text-center position-relative'>
                      {loginStatusMessage}
                      <button
                        className='btn btn-danger rounded-circle py-2 position-absolute start-100 top-0 translate-middle'
                        onClick={() => { setLoginStatusMessage(false) }}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                    : null
                }

              </div>

              {/* register */}

              <div id="pop-up-register" className="tab-pane fade">
                <form onSubmit={handelRegisterStudent}>
                  <div className='register-form-container d-flex flex-column gap-1'>
                    <div className='d-flex gap-1'>
                      <input type="text" onChange={handelStudentInputChange} className='form-control' placeholder='Full Name' name="name" value={student.name} required />
                      <input type="email" onChange={handelStudentInputChange} className='form-control' placeholder='Email Address' name='email' value={student.email} required />
                      <input type="tel" onChange={handelStudentInputChange} className='form-control' placeholder='Phone' name='phone' value={student.phone} required />
                    </div>
                    <div className=''>
                      <span className='fw-semibold px-2'>Date of birth: </span>
                      <div>
                        <input type="date" onChange={handelStudentInputChange} className='form-control' name='dob' value={student.dob} required />
                      </div>
                    </div>
                    <div>
                      <span className='px-2 fw-semibold'>
                        Current Education:
                      </span>
                      <div className='d-flex gap-1'>
                        <input type="text" onChange={handelStudentInputChange} placeholder='Education' className='form-control' name='currentEducation' value={student.currentEducation} required />
                        <input type="text" onChange={handelStudentInputChange} placeholder='Intrested Topics In' className='form-control' name='intrestedTopics' value={student.intrestedTopics} required />
                      </div>
                    </div>
                    <div>
                      <span className='px-2 fw-regular'>
                        Create Password:<span>Atleast 8 char|A-Z,a-z,0-9,sp. char*</span>
                      </span>
                      <div className='d-flex flex-column gap-1'>
                        <input type="text" onChange={handelStudentInputChange} placeholder='password' className='form-control' name='password' value={student.password} required />
                        {/* add password validation */}
                      </div>
                    </div>
                    {/*  */}
                    <div className='d-flex gap-2 justify-content-center py-2'>
                      <button type='sumbit' className='btn btn-success fw-semibold'>Register</button>
                      <button type="reset" className='btn btn-danger fw-semibold'>Reset</button>
                    </div>
                  </div>
                </form>

                {/* message for success or error */}
                {
                  registrationStatusMessage ?
                    <div className='alert alert-warning text-center position-relative'>
                      {registrationStatusMessage}
                      <button
                        className='btn btn-danger rounded-circle py-2 position-absolute start-100 top-0 translate-middle'
                        onClick={() => { setRegistrationStatusMessage(false) }}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                    : null
                }

              </div>


            </div>
          </div>
        </div>
      </div>

      {/* alert status */}

    </>
  )
}

export default LoginRegisterPopUp