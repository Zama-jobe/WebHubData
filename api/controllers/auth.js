import { db } from "../db.js";
import bcrypt from "bcryptjs";
const cors = require("cors");

export const register = (req, res) => {
  app.use(
    cors({
      origin: "https://7h2zs7-3000.csb.app/",
      credentials: true,
    }),
  );
  //CHECK FOR EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and creation of user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users ( `username` , `email` , `password`) Values (?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertQuery, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
