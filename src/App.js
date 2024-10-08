import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./style.scss"

// connect bootstarap

import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"


import { Home } from "./components/pages/Home.jsx"
import { NotFound } from "./components/pages/NotFound.jsx"
import StudentAccount from './components/pages/StudentAccount.jsx'
import Tools from './components/pages/Tools.jsx'
import SelectedTool from './components/pages/SelectedTool.jsx'

const App = () => {
    return (
        <>
            <BrowserRouter>

                <Routes>

                    <Route path='/' element={<Home />} />
                    <Route path='/tools' element={<Tools />} />
                    <Route path='*' element={<NotFound />} />

                    {/* protected page student account */}

                    <Route path='/my-account' element={<StudentAccount />} />

                    {/* tools  */}

                    <Route path='/tools/:id/:tool' element={<SelectedTool />} />

                </Routes>

            </BrowserRouter>
        </>
    )
}

export { App }
