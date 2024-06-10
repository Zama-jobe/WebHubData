import React, { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          {post.image && (
            <img
              src={`http://localhost:4000/uploads/${post.image}`}
              alt={post.title}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
