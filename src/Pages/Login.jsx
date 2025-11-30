import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/apply-now");
    } catch (err) {
      toast.error("Credentials are incorrect.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/apply-now");
    } catch (err) {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        overflow: "hidden",
      }}
    >
      <Toaster position="top-right" />

      {/* LEFT PANEL – Visible only on Desktop */}
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",

          px: 12,
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", maxWidth: "480px" }}>
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: 800,
              textShadow: "0px 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: "3rem",
              fontWeight: 900,
              background: "linear-gradient(90deg,#6366F1,#A855F7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digital Deta
          </Typography>

          <Typography
            sx={{
              mt: 2,
              opacity: 0.85,
              fontSize: "1.1rem",
            }}
          >
            Let's continue shaping the future together.
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT PANEL – LOGIN FORM */}
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        component={Paper}
        elevation={0}
        square
        sx={{
          background: "#0f172a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 5, md: 12 },
          py: { xs: 5, sm: 6 },
          minHeight: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", maxWidth: "420px" }}
        >
          {/* Title */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                background: "linear-gradient(90deg,#6366F1,#A855F7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "1.8rem", md: "2rem" },
              }}
            >
              Login
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Access your account to continue
            </Typography>
          </Box>

          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "rgba(255,255,255,0.1)",
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#818CF8" },
                "& input": { color: "white" },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.6)",
              },
            }}
          />

          {/* Password */}
          <TextField
            fullWidth
            margin="normal"
            type={showPass ? "text" : "password"}
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? (
                      <VisibilityOff sx={{ color: "white" }} />
                    ) : (
                      <Visibility sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                background: "rgba(255,255,255,0.1)",
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "#818CF8" },
                "& input": { color: "white" },
              },
              "& .MuiInputLabel-root": {
                color: "rgba(255,255,255,0.6)",
              },
            }}
          />

          {/* Forgot Password */}
          <Typography
            onClick={() => navigate("/forgot-password")}
            sx={{
              cursor: "pointer",
              textAlign: "right",
              mt: 1,
              color: "#818CF8",
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot password?
          </Typography>

          {/* Login Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: 2,
              fontSize: { xs: "0.95rem", md: "1rem" },
              fontWeight: 600,
              background: "linear-gradient(90deg,#6366F1,#8B5CF6)",
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Google Login */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            sx={{
              mt: 2,
              py: 1.3,
              borderRadius: 2,
              color: "white",
              borderColor: "rgba(255,255,255,0.3)",
              "&:hover": {
                borderColor: "#818CF8",
                background: "rgba(255,255,255,0.05)",
              },
            }}
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>

          {/* Sign Up link */}
          <Typography
            sx={{
              textAlign: "center",
              mt: 3,
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ cursor: "pointer", color: "#818CF8", fontWeight: 600 }}
            >
              Sign up
            </span>
          </Typography>
        </motion.div>
      </Grid>
    </Grid>
  );
}
