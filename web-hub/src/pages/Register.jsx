// import React, { useState } from "react";
// import "../style.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define base URL for your CodeSandbox backend
// const baseURL = "https://7h2zs7-8802.csb.app"; // Replace this with your CodeSandbox backend URL

// const Register = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [err, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Concatenate baseURL with the API route
//       await axios.post(`${baseURL}/api/auth/register`, inputs);
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="auth">
//       <h1>Register</h1>
//       <form>
//         <input
//           required
//           type="text"
//           placeholder="username"
//           name="username"
//           onChange={handleChange}
//         ></input>
//         <input
//           required
//           type="email"
//           placeholder="email"
//           name="email"
//           onChange={handleChange}
//         ></input>
//         <input
//           required
//           type="password"
//           placeholder="password"
//           name="password"
//           onChange={handleChange}
//         ></input>
//         <button onClick={handleSubmit}>Register</button>
//         <p>{err && err}</p>
//         <span>
//           Already have an account? <Link to="/login">Login</Link>
//         </span>
//       </form>
//     </div>
//   );
// };

// export default Register;
