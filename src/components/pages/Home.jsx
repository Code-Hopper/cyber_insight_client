import React, { useState } from 'react'
import "../components.scss"
import Header from '../includes/header.jsx'
import Heros from '../sections/Heros.jsx'
import CoursesRibbion from '../includes/CoursesRibbon.jsx'
import PleaseLogin from '../sections/PleaseLogin.jsx'

const Home = () => {

    return (
        <>

            <Header />

            <CoursesRibbion />

            <Heros />

        </>
    )
}

export { Home }