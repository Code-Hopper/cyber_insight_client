import React from 'react'
import "../components.scss"

import Header from '../includes/header.jsx'
import Heros from '../sections/Heros.jsx'
import CoursesRibbion from '../includes/CoursesRibbon.jsx'
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
