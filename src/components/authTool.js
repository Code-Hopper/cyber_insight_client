import axios from "axios"

let authTool = async (id) => {
    try {

        console.log("auth tool hitted !", id)

        // try to access user token
        let token = localStorage.getItem("token")

        if (!token) {
            throw ("unable to access token !")
        }

        let validate = await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_CALL_ADDRESS}/toolaccess/${id}`,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        console.log(validate.data)
        console.log("valid request")

        if(validate.status !== 200){
            throw("user validation failed !")
        }

        return true

    } catch (err) {
        console.log("auth failed ! ", err)
        return false
    }
}

export { authTool }