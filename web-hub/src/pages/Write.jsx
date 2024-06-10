import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", value);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch('http://localhost:4000/api/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/'); // Redirect to home page
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add">
      <form className="content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          required
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            name="content"
          />
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span><b>Status:</b> Draft</span>
            <span><b>Visibility:</b> Public</span>
            <input
              type="file"
              id="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label className="file" htmlFor="file">Upload Image</label>
            <div className="buttons">
              <button type="button" className="firstChild">Save as a draft</button>
              <button type="submit" className="secondChild">Update</button>
            </div>
          </div>
          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input type="radio" name="cat" value="art" id="art" />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input type="radio" name="cat" value="science" id="science" />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input type="radio" name="cat" value="technology" id="technology" />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input type="radio" name="cat" value="cinema" id="cinema" />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input type="radio" name="cat" value="design" id="design" />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input type="radio" name="cat" value="food" id="food" />
              <label htmlFor="food">Food</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
