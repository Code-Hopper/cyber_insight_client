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

            {/* please login message pop up */}
            {/* only on this page because when user will be redirected they will land on this page where please login popup will appear */}

            <PleaseLogin />

        </>
    )
}

export { Home }