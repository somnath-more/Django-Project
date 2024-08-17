/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // POST request to authenticate the user
      const response = await axios.get(
        `http://localhost:8000/users?email=${email}&password=${password}`
      );

      // Check response for authentication success

      if (response.data) {
        console.log(response.data);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="body2" gutterBottom>
        Don't have an account? <a href="/register">Sign Up</a>
      </Typography>
    </Container>
  );
};

export default Login;
