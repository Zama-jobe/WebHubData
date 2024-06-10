import React, { useEffect, useState } from "react";
import "../style.css";
import Menu from "../components/Menu";
import Zama from "../img/zama-webhub.jpg";
import Edit from "../img/pen.svg";
import Delete from "../img/trash.svg";
import { Link, useNavigate, useParams } from "react-router-dom";

const Single = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate= useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="single">
      <div className="content">
        <img
          src={post.img || "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
          alt={post.title}
        />
        <div className="user">
          <img src={Zama} alt="User" />
          <div className="info">
            <span>Zama</span>
            <p> Posted {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=${post.id}`}>
              <img src={Edit} alt="Edit" />
            </Link>
            <img src={Delete} alt="Delete" onClick={handleDelete} />
          </div>
        </div>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <Menu />
    </div>
  );
};

export default Single;
