import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Compiler from '../sections/Compiler'
import Header from '../includes/header'
import { Link } from 'react-router-dom'
import Keylogger from '../sections/Keylogger'
import { authTool } from '../authTool.js'

const SelectedTool = () => {
    // Get the parameters from the URL
    let { id, tool } = useParams()

    console.log("User ID:", id)
    console.log("Selected Tool:", tool)

    // Select the appropriate tool component based on the URL parameter
    const SelectTool = (tool) => {
        switch (tool) {
            case "code-compiler":
                return <Compiler />
            case "keylogger":
                // Replace this with the actual Keylogger component when available
                return <Keylogger />
            default:
                return <div>Tool not found</div>
        }
    }

    let canUserAccessTool = async () => {
        try {

            let studentValid = await authTool(id)

            console.log(studentValid)

        } catch (err) {
            console.log("error cannnot allow tool access !")
        }
    }

    useEffect(()=>{
        canUserAccessTool()
    },[])

    return (
        <>
            <Header />

            <div>
                <Link className='btn btn-primary' to="/tools">
                    {"<- return to tools page"}
                </Link>
            </div>

            <div className="container-fluid">
                <div className="container py-5">
                    <h2>Selected Tool: {tool}</h2>

                    {/* Render the selected tool */}
                    <div className="tool-container">
                        {SelectTool(tool)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectedTool
