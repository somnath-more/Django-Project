/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // POST request to register the user
      const response = await axios.post(`http://localhost:8000/users/`, {
        email,
        password,
      });

      // Check response for registration success
      if (response.data) {
        console.log(response.data);
        navigate("/dashboard");
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" gutterBottom>
        Sign Up
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
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignUp}>
        Sign Up
      </Button>
      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account? <a href="/login">Log In</a>
      </Typography>
    </Container>
  );
};

export default SignUp;
