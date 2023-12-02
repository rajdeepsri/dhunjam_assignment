import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data.status === 200) {
        // Save the token and user ID in context
        login(response.data.data.token, response.data.data.id);

        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      //              DJ@4
      //              Dhunjam@2023
    }
  };

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1>Venue Admin Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserame(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login_btn">Sign In</button>
        <p>New Registration?</p>
      </form>
    </div>
  );
};

export default Login;
