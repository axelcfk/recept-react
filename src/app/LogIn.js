import { useState, useEffect } from "react";

export default function Login({ setIsLoggedIn, setUsername, isLoggedIn }) {
  const [username, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (isLoggedIn && savedUsername) {
      setLocalUsername(savedUsername);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    console.log("Attempted login with:", username, password); // Debugging line

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      setUsername(username);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleCreateAccount = () => {
    if (username && password) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      alert("Account created successfully!");
      setIsCreatingAccount(false);
    } else {
      alert("Please fill out both fields.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setUsername("");
    setLocalUsername("");
    setPassword("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome {username}!</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : isCreatingAccount ? (
        <div>
          <h1>Create Account</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleCreateAccount}>Create Account</button>
          <button onClick={() => setIsCreatingAccount(false)}>
            Back to Login
          </button>
        </div>
      ) : (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setLocalUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setIsCreatingAccount(true)}>
            Create Account
          </button>
        </div>
      )}
    </div>
  );
}
