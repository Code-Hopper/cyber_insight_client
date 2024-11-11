import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RxCross2 } from "react-icons/rx";

const PleaseLogin = () => {

    let [studentPopUp, setStudentPopUp] = useState({
        open: false,
        message: ""
    })

    // this function will send a get request 

    let openPopUpIfNotLogedIn = async () => {
        try {

            let token = localStorage.getItem("token")

            console.log(token)

            let allowAccess = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_CALL_ADDRESS}/validateStudent`,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            })

            console.log(allowAccess)

            setStudentPopUp({
                open: false,
                message: "allow access to tools"
            })

        } catch (err) {

            console.log("student must login first",err)

            setStudentPopUp({
                open: true,
                message: "please login to access this tool"
            })
        }
    }

    useEffect(() => {
        openPopUpIfNotLogedIn()
    }, [])

    return (
        <div className={studentPopUp.open ? "pelase-login-alert alert alert-danger position-absolute top-50 start-50 translate-middle z-3 d-flex gap-1" : "collapse"}>
            <span>Please Login/Register To use This Feature</span>
            {/* <button className='btn btn-danger position-absolute top-0 start-100 translate-middle rounded-circle px-2' onClick={() => {
                setStudentPopUp(
                    {
                        open: false,
                        message: ""
                    }
                )
            }}>
                <RxCross2 />
            </button> */}
        </div>
    )
}

export default PleaseLogin