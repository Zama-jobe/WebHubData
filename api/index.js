import express from "express";
import shortid from "shortid";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import mysql from 'mysql2/promise';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', 
  password: 'Rawmason@2023', 
  database: 'blog', 
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = 4000;

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Create a new blog post
app.post("/api/posts", upload.single('image'), async (req, res) => {
  const { title, content } = req.body;
  const imageUrl = req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : null;

  try {
    const [result] = await pool.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, imageUrl]);
    const newPost = {
      id: result.insertId,
      title,
      content,
      image: imageUrl
    };
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

// Get all blog posts
app.get("/api/posts", async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

// Get a single blog post by ID
app.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ message: "Post does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

// Delete a blog post by ID
app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Database error", error: err });
  }
});

// Serve images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
