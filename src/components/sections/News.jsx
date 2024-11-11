import React, { useEffect, useState } from 'react'
import { GrPowerReset } from "react-icons/gr";
import axios from 'axios'

const News = () => {

    let new_api_key = "pub_57821d1a864faedc0d9807ca0d7a59347e09a"

    let [news, setNews] = useState(false)

    let fetchNews = async () => {
        console.log("fetching news")
        try {

            let fetchedData = await axios.get(`https://newsdata.io/api/1/news?apikey=${new_api_key}&q=tech&country=in&language=en&category=technology`)

            if (!fetchedData) {
                throw ("no news fetched from api !")
            }

            // console.log(fetchedData.data.results)

            setNews(fetchedData.data.results)

        } catch (err) {
            console.log("no news fetched ", err)
            setNews(false)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])


    let eachNewsBlock = (props) => {
        return (
            <div className='col-12 pt-2 px-4 border-bottom'>
                {/* fetch image | image_url */}
                <img className='img-fluid' src={props.image_url} alt="news" />
                {/* fetch date and time */}
                <span className='d-block w-100 fw-semibold'>
                    Released: {props.pubDate}
                </span>
                <p>
                    {/* title */}
                    {props.title}
                </p>
                <a href={props.link} target="_blank">read more</a>
            </div>
        )
    }

    return (
        <>
            <div id='' className='news-block-main position-fixed container shadow p-0 bg-light'>
                <div className='newscontainer'>
                    <div className='bg-warning d-flex align-items-center gap-2 px-2'>
                        <div className='text-center position-sticky top-0'>
                            <span className='fw-bold fs-4'>Tech World News</span>
                        </div>
                        <button className='btn btn-primary rounded-circle pt-2' id='refresh-news' onClick={fetchNews}>
                            <span className=''><GrPowerReset /></span>
                        </button>
                    </div>
                    {/* update news fetch it from provided api */}
                    <div className='row news-block-row-container'>
                        {
                            news ? news.map(eachNewsBlock) : "no news avaiable"
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
