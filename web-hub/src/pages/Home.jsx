import React, { useEffect, useState } from "react";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={post.image || 'default-image-url.jpg'} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                <button onClick={() => handleReadMore(post.id)}>Read More</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
