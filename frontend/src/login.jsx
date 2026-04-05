import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && userid === "admin123" && password === "password") {
      navigate("/welcomeadmin");
    } else if (username === "user" && userid === "user123" && password === "password") {
      navigate("/welcomeuser");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
  <div className="loginpage">
    <div className="logincontainer">
      <h1 className="usernamefont">Username:</h1>
      <input 
        type="text" 
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <h1 className="useridfont">User ID:</h1>
      <input 
        type="text" 
        placeholder="Enter User ID"
        onChange={(e) => setUserid(e.target.value)}
      />

      <h1 className="passwordfont">Password:</h1>
      <input 
        type="password" 
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <button className="loginbutton" onClick={handleLogin}>
        Login
      </button>
    </div>
    </div>
  );
}

export default Login;