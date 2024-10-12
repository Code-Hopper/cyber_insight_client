import React, { useEffect, useState } from 'react'
import { SiCyberdefenders } from "react-icons/si";
import { FaRegUserCircle, FaSadCry } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginRegisterPopUp from "../sections/LoginRegisterPopUp"
import { authUser } from '../auth.js';

const Header = () => {

    let navigate = useNavigate()

    let [openLoginPopUp, setOpenLoginPopUp] = useState(false)

    let [checkIfStudentLogedIn, setCheckIfStudentLogedIn] = useState(false)

    let [studentLogedInNavbarData, setStudentLogedInNavbarData] = useState("")

    let handelOpenPopUpClick = () => {
        setOpenLoginPopUp(true)
    }

    let checkStudnetLogedIn = async (e) => {

        try {

            // auth using authTool function

            let validUser = await authUser()

            if (!validUser) {
                throw ("student not logedIn !")
            }

            // console.log(validUser)

            setStudentLogedInNavbarData(validUser)

            setCheckIfStudentLogedIn(true)

            return true

        } catch (err) {

            console.log(err)

            setCheckIfStudentLogedIn(false)
            return false

        }

    }

    useEffect(() => {
        checkStudnetLogedIn()
    }, [])

    let logout = () => {
        console.log("loging out student !")
        localStorage.removeItem("token")
        // call check logedin function to reset navbar dropdown
        checkStudnetLogedIn()
        navigate("/")
    }

    return (
        <>
            <nav className='bg-dark position-relative navbar-main-container'>
                <div className='container navbar navbar-expand navbar-dark bg-dark gap-4'>
                    <h1 className='navbar-brand d-flex gap-1 align-items-center'>
                        <SiCyberdefenders className='text-warning' size={"25px"} /> Cyber Insight
                    </h1>
                    <ul className='navbar-nav ms-auto gap-3'>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/">Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/">Learning</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to="/tools">Tools</Link>
                        </li>
                    </ul>
                    {/* if student loged in welcome them */}

                    <div className='navbar-dropdown-container'>
                        {
                            checkIfStudentLogedIn ?
                                <>
                                    <button className='btn text-light d-flex align-items-center gap-2'>
                                        <FaRegUserCircle size={"25px"} /> welcome,<span className='fw-semibold text-warning'>{studentLogedInNavbarData.name}</span> !
                                    </button>
                                    <div className='login-dropdown shadow-lg rounded'>
                                        <ul className='navbar-nav d-flex flex-column text-center fw-semibold'>
                                            <li className='nav-item p-3 bg-warning'>
                                                <Link className='nav-link p-0 text-dark' to="/my-account">My Account</Link>
                                            </li>
                                            <li className='nav-item p-3 bg-danger' onClick={logout}>
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                </>
                                :
                                <>
                                    <button className='btn text-light d-flex align-items-center gap-2'>
                                        <FaRegUserCircle size={"25px"} /> Let's get <span className='fw-semibold text-warning'>started</span> !
                                    </button>
                                    <div className='login-dropdown shadow-lg rounded'>
                                        <ul className='navbar-nav d-flex flex-column text-center fw-semibold'>
                                            <li onClick={handelOpenPopUpClick} className='nav-item p-3 bg-warning'>Already Registered, please Login !</li>
                                            <li onClick={handelOpenPopUpClick} className='nav-item p-3'>Register</li>
                                        </ul>
                                    </div>
                                </>
                        }

                    </div>
                    {/* dropdown for login */}
                </div>
            </nav>

            <LoginRegisterPopUp openPopUp={openLoginPopUp} setOpenPopUp={setOpenLoginPopUp} />

        </>
    )
}

export default Header