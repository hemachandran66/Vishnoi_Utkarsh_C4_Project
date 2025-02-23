import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "../Navbar/Navbar";
import Copyright from "../../common/Copyright";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [contactNumber, setContactNumber] = useState();

  const role = ["admin"];

  const isValidPassword = (password, confirmPassword) => {
    if (password.length < 6) {
      toast.error("Password length should be greater than 6", {
        toastId: "error",
      });
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Mismatched password! Try again", {
        toastId: "error",
      });
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isValidPassword(password, confirmPassword)) {
      fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
          firstName,
          lastName,
          contactNumber,
        }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            if (res.status === 400) {
              throw new Error(data.message);
            } else {
              throw new Error(
                "There was a problem with the Fetch operation " + res.status
              );
            }
          }
          return data;
        })
        .then((data) => {
          toast.success(data.message, { toastId: "success" });
        })
        .catch((err) => {
          toast.error(err.message, { toastId: "login-alert" });
        });
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            id="login-form"
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="lastName"
              id="lastName"
              autoComplete="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email address"
              type="email"
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contactNumber"
              label="Contact Number"
              type="number"
              id="contact"
              autoComplete="contact"
              onChange={(e) => setContactNumber(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default Signup;
