import axios from "axios"

let authUser = async () => {
    try {

        console.log("auth hitted !")

        // try to access user token
        let token = localStorage.getItem("token")

        if (!token) {
            throw ("unable to access token !")
        }

        let validate = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_CALL_ADDRESS}/my-account`,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        console.log(validate.data)
        console.log("valid request")

        if(!validate.data.studentData){
            throw("user validation failed !")
        }

        return validate.data.studentData

    } catch (err) {
        console.log("auth failed ! ", err)
    }
}

export { authUser }