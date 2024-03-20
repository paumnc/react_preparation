import {Link, useParams, useNavigate } from 'react-router-dom'
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Posts() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();
  const [searchId, setSearchId] = useState(id);

  function onSearch() {
    fetchPost(searchId)
    console.log(searchId)
  }

  async function fetchPost(userId) {
    setLoading(true);
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId || id}`)
    setPosts(data)
    setLoading(false);
    console.log(data)
    // const data2 = await data.json();
    // console.log(data2)
  }

  function onSearchKeyPress(key) {
    if (key === "Enter") {
      onSearch();
    }
  }

  useEffect(() => {
    fetchPost();
  }, [])

  return (
    <div>
      <div className="post__search">
        {/* if you want to navigate programmatically */}
      <button onClick={() => navigate('/')}> Back</button>
        {/*
        using link
        <Link to='/'>
          <button>← Back</button>
        </Link> */}
        <div className="post__search--container">
          <label className="post__search--label">Search by Id</label>
          <input
            type="number" value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
            onKeyUp={(event) => onSearchKeyPress(event.key)}
          />
          <button onClick={() => onSearch()}>Enter</button>
        </div>
      </div>
      {
        loading ?
          new Array(10).fill(0).map((_, index) =>

          (
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>)) :

          (posts.map(post => (
            <div className="post" key={post.id}>
              <div className="post__title">{post.title}</div>
              <p className="post__body">{post.body}</p>
            </div>
          )))
      }
    </div>
  )
}
