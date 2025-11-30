// ForgotPasswordPhoneOTP.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  fetchSignInMethodsForEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Multi-step Forgot Password using Phone OTP (Firebase)
 * Steps:
 * 1) Enter email -> check if exists and has phone provider
 * 2) Enter phone (prefill if you want) -> send OTP
 * 3) Enter OTP -> verify and sign in the user
 * 4) Enter new password & confirm -> update password
 *
 * NOTE: The user's account MUST have the phone number linked in Firebase Auth.
 */

export default function ForgotPasswordPhoneOTP() {
  const navigate = useNavigate();

  // Steps: "email" -> "sendOtp" -> "verifyOtp" -> "reset" -> "done"
  const [step, setStep] = useState("email");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Expect in E.164 format, e.g. +919876543210
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmationResultRef = useRef(null);
  const recaptchaWidgetRef = useRef(null);

  useEffect(() => {
    // Cleanup recaptcha on unmount
    return () => {
      if (recaptchaWidgetRef.current) {
        try {
          recaptchaWidgetRef.current.clear();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Step 1: validate email exists & has phone provider
  const handleCheckEmail = async () => {
    if (!email) {
      toast.error("Please enter your registered email.");
      return;
    }

    setLoading(true);
    await auth.signOut();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (!methods || methods.length === 0) {
        toast.error("No account found with this email.");
        setLoading(false);
        return;
      }

      // method names might be like "password", "google.com", "phone"
      if (!methods.includes("phone")) {
        toast.error(
          "This account is not linked with a phone number. Phone OTP reset not available."
        );
        setLoading(false);
        return;
      }

      toast.success("Email verified. Proceed to phone verification.");
      setStep("sendOtp");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to check email.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize/invisible Recaptcha and send OTP
  const handleSendOtp = async () => {
    if (!phone) {
      toast.error(
        "Please enter your phone number in international format (e.g. +919876543210)."
      );
      return;
    }

    setLoading(true);
    try {
      // setup invisible recaptcha if not already
      if (!window.recaptchaVerifier) {
        // eslint-disable-next-line no-undef
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              // recaptcha solved
            },
          },
          auth
        );
        recaptchaWidgetRef.current = window.recaptchaVerifier;
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      confirmationResultRef.current = confirmationResult;
      toast.success("OTP sent to your phone.");
      setStep("verifyOtp");
    } catch (err) {
      console.error(err);
      // If recaptcha expired or invalid, reset it
      try {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          window.recaptchaVerifier = null;
          recaptchaWidgetRef.current = null;
        }
      } catch (e) {}
      toast.error(
        err.message || "Failed to send OTP. Check phone format and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP code
  const handleVerifyOtp = async () => {
    if (!code) {
      toast.error("Please enter the OTP sent to your phone.");
      return;
    }
    setLoading(true);
    try {
      if (!confirmationResultRef.current) {
        toast.error("No OTP request found. Please resend OTP.");
        setLoading(false);
        return;
      }

      const userCredential = await confirmationResultRef.current.confirm(code);
      // user is now signed in
      toast.success("Phone verified. You can now reset your password.");
      setStep("reset");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Update password — currently signed-in user via phone
  const handleResetPassword = async () => {
    if (!newPass || !confirmPass) {
      toast.error("Please enter and confirm your new password.");
      return;
    }
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPass.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("No authenticated user found. Please verify OTP again.");
        setLoading(false);
        return;
      }

      await updatePassword(user, newPass);
      toast.success(
        "Password updated successfully. Please login with your new password."
      );
      // sign out to force login with email+password
      await auth.signOut();
      setStep("done");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render small header/paper
  const CardWrapper = ({ children }) => (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 980,
          borderRadius: 3,
          overflow: "hidden",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {children}
      </Paper>
    </Box>
  );

  return (
    <>
      <Toaster position="top-right" />
      <CardWrapper>
        {/* Left visual / message column */}
        <Box
          sx={{
            flex: 1,
            backgroundImage:
              "url('/mnt/data/1613b386-e93c-493d-a06c-3f7c3e73e941.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: { xs: "none", md: "block" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(2,6,23,0.6)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              color: "#fff",
              textAlign: "center",
              px: 4,
            }}
          >
            <Typography sx={{ fontSize: "2.25rem", fontWeight: 800, mb: 1 }}>
              Secure your account
            </Typography>
            <Typography
              sx={{
                fontSize: "2.6rem",
                fontWeight: 900,
                background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Reset with Phone OTP
            </Typography>
            <Typography sx={{ mt: 2, opacity: 0.85 }}>
              We'll verify via the phone linked to your account, then let you
              set a new password.
            </Typography>
          </Box>
        </Box>

        {/* Right form column */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 6 },
            background: "#071024",
            color: "white",
          }}
        >
          {/* Close / back button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={() => navigate("/login")}
              sx={{ color: "white", bgcolor: "rgba(255,255,255,0.03)" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Container maxWidth="sm" sx={{ mt: 1 }}>
            {/* Step content */}
            {step === "email" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#a78bfa", mb: 1 }}
                >
                  Forgot Password
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.8 }}>
                  Enter your registered email. We will verify that your account
                  is linked with a phone number.
                </Typography>

                <TextField
                  fullWidth
                  label="Registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ style: { color: "#cbd5e1" } }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      background: "#0f172a",
                      borderRadius: 2,
                      color: "white",
                      "& fieldset": { borderColor: "#1f2937" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleCheckEmail}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                      fontWeight: 700,
                    }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                    sx={{ color: "white", borderColor: "#334155" }}
                  >
                    Back to Login
                  </Button>
                </Box>
              </>
            )}

            {step === "sendOtp" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#a78bfa", mb: 1 }}
                >
                  Verify Phone
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.8 }}>
                  Enter the phone linked to your account (international format,
                  e.g. +919876543210), then send OTP.
                </Typography>

                <TextField
                  fullWidth
                  label="Phone (E.164) e.g. +919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputLabelProps={{ style: { color: "#cbd5e1" } }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      background: "#0f172a",
                      borderRadius: 2,
                      color: "white",
                      "& fieldset": { borderColor: "#1f2937" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleSendOtp}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                      fontWeight: 700,
                    }}
                  >
                    Send OTP
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => setStep("email")}
                    sx={{ color: "white", borderColor: "#334155" }}
                  >
                    Change Email
                  </Button>
                </Box>

                {/* invisible recaptcha placeholder */}
                <div id="recaptcha-container" />
              </>
            )}

            {step === "verifyOtp" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#a78bfa", mb: 1 }}
                >
                  Enter OTP
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.8 }}>
                  We sent a code to {phone}. Enter it here to verify.
                </Typography>

                <TextField
                  fullWidth
                  label="OTP Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  InputLabelProps={{ style: { color: "#cbd5e1" } }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      background: "#0f172a",
                      borderRadius: 2,
                      color: "white",
                      "& fieldset": { borderColor: "#1f2937" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleVerifyOtp}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                      fontWeight: 700,
                    }}
                  >
                    Verify
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => setStep("sendOtp")}
                    sx={{ color: "white", borderColor: "#334155" }}
                  >
                    Resend
                  </Button>
                </Box>
              </>
            )}

            {step === "reset" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#a78bfa", mb: 1 }}
                >
                  Set New Password
                </Typography>
                <Typography sx={{ mb: 3, opacity: 0.8 }}>
                  Enter a new password. It must be at least 6 characters.
                </Typography>

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  InputLabelProps={{ style: { color: "#cbd5e1" } }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      background: "#0f172a",
                      borderRadius: 2,
                      color: "white",
                      "& fieldset": { borderColor: "#1f2937" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  InputLabelProps={{ style: { color: "#cbd5e1" } }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      background: "#0f172a",
                      borderRadius: 2,
                      color: "white",
                      "& fieldset": { borderColor: "#1f2937" },
                      "&:hover fieldset": { borderColor: "#6366f1" },
                    },
                  }}
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    onClick={handleResetPassword}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                      fontWeight: 700,
                    }}
                  >
                    Update Password
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                    sx={{ color: "white", borderColor: "#334155" }}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            )}

            {step === "done" && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#a78bfa", mb: 1 }}
                >
                  Password Reset
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  Your password has been updated. Please sign in with your new
                  password.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    background: "linear-gradient(90deg,#7b61ff,#a78bfa)",
                    fontWeight: 700,
                  }}
                >
                  Go to Login
                </Button>
              </>
            )}
          </Container>
        </Box>
      </CardWrapper>
    </>
  );
}
