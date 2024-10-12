import React from 'react'
import bot from "../media/bot.png"
import platform from "../media/platform.png"

const Heros = () => {
    return (
        <div className='container-fluid heros-main-container'>
            <div className='container'>
                <div className="row">
                    <div className='col heros-media'>
                        {/* heros media */}
                        <img src={bot} className="bot w-100" alt="" />
                        <img src={platform} className="platform w-100" alt="" />
                    </div>
                    <div className='col heros-text d-flex flex-column align-items-end gap-3'>
                        <h1 className='heros-title'>Cyber Insight</h1>
                        <h2 className='heros-sub-title'>Illuminating Cyber Security for all</h2>
                        <p className='heros-extra-text'>
                            Cyber Security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. It's also known as information technology security or electronic information security.
                        </p>
                        <div className='heros-cta'>
                            <button className='heros-button rounded'>
                                Start Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Heros
