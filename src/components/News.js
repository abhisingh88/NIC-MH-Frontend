import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

function News(props) {

  const host = "http://localhost:3000"

  const [news, setNews] = useState([])

  const getNews = async () => {
    const response = await fetch(`${host}/view/getTopNews`, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        'auth-token': localStorage.getItem("token"),
      },
    });
    const data = await response.json()
    setNews(data)
    console.log(news);
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      getNews()
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <>
      <h1>News</h1>
      <p className="text-primary">{
        news.length === 0 && "Loading data.."
      }
      </p>
      <div className='container'>
        {
          news.map((data) => {
            return <div className="list-group">
              <a href="#" target="_blank" className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{data.newsTitle}</h5>
                  {/* <small className="text-muted">3 days ago</small> */}
                </div>
                <p className="mb-1">{data.newsDesc}</p>
                {/* <small className="text-muted">And some muted small print.</small> */}
              </a>
            </div>
          })
        }
      </div>
    </>
  )
}

export default News