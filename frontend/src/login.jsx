import styles from "./login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigate("/welcomeadmin");
    } else if (username === "user" && password === "password") {
      navigate("/welcomeuser");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.logincontainer}>
        <div className={styles.welcomeWrapper}>
          <h1 className={styles.welcome}>Welcome User!</h1>
          <p className={styles.welcomeCaption}>Please enter your credentials</p>
        </div>
        
        <h1 className={styles.usernamefont}>Username:</h1>
        <input 
          type="text" 
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <h1 className={styles.passwordfont}>Password:</h1>
        <input 
          type="password" 
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.loginbutton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;