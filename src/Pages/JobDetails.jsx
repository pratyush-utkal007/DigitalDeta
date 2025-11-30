import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsArrowRightCircle } from "react-icons/bs";
import { auth } from "../firebase";
import toast, { Toaster } from "react-hot-toast";
import DynamicHeroSection from "../Componets/DynamicHeroSection";

export default function JobDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const job = state?.job;

  if (!job)
    return (
      <h2 style={{ textAlign: "center", padding: "50px" }}>Job Not Found</h2>
    );

  // ✨ Login Check Logic with Toast
  const handleApply = () => {
    if (!auth.currentUser) {
      // Save job for redirect after login
      sessionStorage.setItem("pendingJob", JSON.stringify(job));

      toast.error("Please log in to apply for this job.", {
        duration: 2500,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200); // wait 1.2 sec so user can see toast
    } else {
      navigate("/apply-now", { state: { jobTitle: job.title } });
    }
  };

  return (
    <>
      <DynamicHeroSection
        title="Job"
        highlight="Overview"
        description="Discover your next role at Digital Deta. Explore responsibilities, required skills, and how you can make an impact by joining our growing team."
        bgImage="https://imgs.search.brave.com/DZSrnCgwJwmfuP61hL7TsdIUFIWFwFrrJdAaBnslFiI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDUzMDY0/ODMuanBn"
        accentColor="#0d3b66"
      />

      <Container sx={{ py: 10 }}>
        <Toaster position="top-center" />

        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            background: "#ffffff",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          {/* Job Title */}
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ mb: 2, color: "#1a1a1a" }}
          >
            {job.title}
          </Typography>

          {/* Meta Info */}
          <Box
            sx={{
              display: "flex",
              gap: 4,
              mt: 1,
              mb: 4,
              flexWrap: "wrap",
              fontSize: "1.1rem",
            }}
          >
            <Typography>🕛 {job.type}</Typography>
            <Typography>📍 {job.location}</Typography>
            <Typography>📝 {job.experience}</Typography>
          </Box>

          {/* Job Summary */}
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mb: 2, color: "#0d3b66" }}
          >
            Job Summary
          </Typography>

          <Typography sx={{ mb: 4, color: "#444", lineHeight: 1.8 }}>
            {job.summary}
          </Typography>

          {/* Qualifications */}
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mt: 4, color: "#0d3b66" }}
          >
            Educational Qualifications
          </Typography>

          <Box component="ul" sx={{ mt: 2, pl: 1 }}>
            {job.qualifications.map((q, i) => (
              <Box
                key={i}
                component="li"
                sx={{
                  mb: 1.5,
                  fontSize: "1rem",
                  listStyle: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <AiOutlineCheckCircle
                  size={22}
                  color="#0d3b66"
                  style={{ marginTop: 2 }}
                />
                <span style={{ color: "#444" }}>{q}</span>
              </Box>
            ))}
          </Box>

          {/* Responsibilities */}
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{ mt: 4, color: "#0d3b66" }}
          >
            Key Responsibilities
          </Typography>

          <Box component="ul" sx={{ mt: 2, pl: 1 }}>
            {job.responsibilities.map((r, i) => (
              <Box
                key={i}
                component="li"
                sx={{
                  mb: 1.5,
                  fontSize: "1rem",
                  listStyle: "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <BsArrowRightCircle
                  size={20}
                  color="#0d3b66"
                  style={{ marginTop: 3 }}
                />
                <span style={{ color: "#444" }}>{r}</span>
              </Box>
            ))}
          </Box>

          {/* Apply Button */}
          <Button
            variant="contained"
            onClick={handleApply}
            sx={{
              mt: 5,
              backgroundColor: "#0d3b66",
              px: 5,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 3,
              textTransform: "none",
              "&:hover": { backgroundColor: "#d9363e" },
            }}
          >
            Apply Now
          </Button>
        </Paper>
      </Container>
    </>
  );
}
