import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
  Box,
  Link,
} from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  // LOGIC NOT CHANGED
  const handleSignup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, { displayName: name });
      navigate("/career");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/career");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
      }}
    >
      {/* LEFT PANEL – Only on Desktop */}
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
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", px: 5 }}>
          <Typography
            sx={{
              // boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
              fontSize: "2.7rem",
              fontWeight: 800,
              mb: 1,
              textShadow: "0px 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            Welcome to
          </Typography>

          <Typography
            sx={{
              fontSize: "3.4rem",
              fontWeight: 900,
              background: "linear-gradient(90deg,#7b61ff,#b18bff)",
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
              maxWidth: "450px",
              mx: "auto",
            }}
          >
            Empowering your future with smart digital innovation.
          </Typography>
        </Box>
      </Grid>

      {/* RIGHT SIDE FORM */}
      <Grid
        item
        xs={12}
        md={6}
        component={Paper}
        elevation={0}
        square
        sx={{
          background: "#0f172a",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 5, md: 0 },
        }}
      >
        <Container maxWidth="xs">
          {/* Heading */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#a78bfa",
                fontSize: { xs: "1.9rem", sm: "2.2rem" },
              }}
            >
              Sign Up
            </Typography>
            <Typography
              sx={{
                mt: 1,
                opacity: 0.7,
                fontSize: "0.9rem",
                color: "white",
              }}
            >
              Create your account to get started
            </Typography>
          </Box>

          {/* Full Name */}
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ style: { color: "#cbd5e1" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "#1e293b",
                color: "white",
                "& fieldset": { borderColor: "#334155" },
                "&:hover fieldset": { borderColor: "#6366f1" },
              },
            }}
          />

          {/* Email */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#cbd5e1" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "#1e293b",
                color: "white",
                "& fieldset": { borderColor: "#334155" },
                "&:hover fieldset": { borderColor: "#6366f1" },
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

          {/* Signup Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              background: "linear-gradient(90deg,#7b61ff,#a78bfa,#c084fc)",
              borderRadius: 2,
              fontWeight: 700,
              "&:hover": {
                background: "linear-gradient(90deg,#6d55e0,#9670f5,#b26efc)",
              },
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>

          {/* Google Signup */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<Google />}
            sx={{
              mt: 2,
              py: 1.3,
              borderRadius: 2,
              borderColor: "#475569",
              color: "white",
              "&:hover": { background: "rgba(255,255,255,0.05)" },
            }}
            onClick={handleGoogleSignup}
          >
            Sign Up with Google
          </Button>

          {/* Redirect to Login */}
          <Typography
            sx={{ mt: 3, textAlign: "center", opacity: 0.8, color: "white" }}
          >
            Already have an account?{" "}
            <Link
              onClick={() => navigate("/login")}
              sx={{
                cursor: "pointer",
                color: "#a78bfa",
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
