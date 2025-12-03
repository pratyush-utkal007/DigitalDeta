import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DynamicHeroSection from "../Componets/DynamicHeroSection";
import careerheader from "../assets/careerheader.jpg";
import { Helmet } from "react-helmet";

// ------------------------ JOB DATA -----------------------------
const jobs = [
  {
    id: "react-developer",
    title: "React Developer",
    experience: "2–3 Years",
    location: "Odisha",
    type: "Full-Time",
    summary:
      "Develop high-performance web applications using React, Redux, TailwindCSS, and modern UI frameworks.",
    responsibilities: [
      "Develop reusable React components with clean code.",
      "Optimize UI performance for speed and scalability.",
      "Integrate REST APIs and collaborate with backend teams.",
      "Translate UI/UX wireframes into real UI.",
      "Participate in code reviews and team discussions.",
    ],
    qualifications: [
      "2–3 years of experience in React.js development.",
      "Strong JavaScript (ES6+), Redux & Hooks knowledge.",
      "Good understanding of REST APIs and Git workflow.",
    ],
  },

  {
    id: "java-developer",
    title: "Java Developer",
    experience: "2–3 Years",
    location: "Odisha",
    type: "Full-Time",
    summary:
      "Design and implement robust backend services using Java and Spring Boot.",
    responsibilities: [
      "Develop secure backend services using Spring Boot.",
      "Create scalable RESTful APIs.",
      "Troubleshoot and optimize backend systems.",
      "Work with MySQL/PostgreSQL databases.",
    ],
    qualifications: [
      "Experience with Java & Spring Boot.",
      "Knowledge of REST API design.",
      "Experience with relational databases.",
    ],
  },

  {
    id: "graphics-designer",
    title: "Graphics Designer",
    experience: "2–3 Years",
    location: "Odisha",
    type: "Full-Time",
    summary:
      "Create visually compelling graphics, branding materials, and UI assets.",
    responsibilities: [
      "Design visuals for web & social platforms.",
      "Create logos, banners, and branding kits.",
      "Support UI/UX teams with digital assets.",
    ],
    qualifications: [
      "Experience with Photoshop, Illustrator, Figma.",
      "Strong creative thinking & design skills.",
    ],
  },

  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    experience: "2–4 Years",
    location: "Odisha",
    type: "Full-Time",
    summary:
      "Work on end-to-end web applications using React, Node.js, and MongoDB.",
    responsibilities: [
      "Develop full-stack applications with React & Node.",
      "Build REST APIs using Express.js.",
      "Implement authentication & authorization.",
    ],
    qualifications: [
      "2–4 years full stack development experience.",
      "Strong React + Node.js + MongoDB knowledge.",
    ],
  },

  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    experience: "2–4 Years",
    location: "Odisha",
    type: "Full-Time",
    summary:
      "Design intuitive and user-friendly interfaces with modern design tools.",
    responsibilities: [
      "Create wireframes, prototypes, and user flows.",
      "Conduct UX research and usability testing.",
    ],
    qualifications: [
      "Expert in Figma, Adobe XD or Sketch.",
      "Strong portfolio of UI/UX projects.",
    ],
  },
];

// ---------------------- MAIN COMPONENT -------------------------
export default function Career() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Careers – Digital Deta</title>
        <meta
          name="description"
          content="Join Digital Deta and grow with a creative and innovative tech team."
        />
      </Helmet>

      <DynamicHeroSection
        title="CAREER"
        highlight="OPPORTUNITIES"
        description="Shape the future with Digital Deta. Work with modern technologies, innovative teams, and real industry challenges."
        bgImage={careerheader}
        accentColor="#0d3b66"
      />

      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 2,
            fontSize: {
              xs: "2.25rem", // text-4xl
              md: "3rem", // text-5xl
            },
            color: "gray.800",
          }}
        >
          Join Our <span className="text-[#0d3b66]">Growing</span> Team
        </Typography>

        <Typography sx={{ mb: 6, fontSize: "1.1rem" }}>
          Explore opportunities that fit your passion, skills, and goals.
        </Typography>
      </Container>

      <Container sx={{ pb: 10 }}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {jobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={job.id} display="flex">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ width: "100%" }}
              >
                <Card
                  onClick={() => navigate("/job-details", { state: { job } })}
                  sx={{
                    cursor: "pointer",
                    borderRadius: 3,
                    p: 2,
                    height: "100%",
                    transition: "0.3s",
                    background: "#ffffff",
                    border: "1px solid #e5e7eb",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 10px 35px rgba(0,0,0,0.12)",
                    },
                    boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ pl: 2 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ mb: 1.5, fontSize: "1.1rem", color: "#0d3b66" }}
                    >
                      {job.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        mb: 2,
                        fontSize: "0.9rem",
                        color: "#333",
                      }}
                    >
                      <Typography className="text-black">
                        🕛 {job.type}
                      </Typography>
                      <Typography className="text-black">
                        📍 {job.location}
                      </Typography>
                      <Typography className="text-black">
                        📝 {job.experience}
                      </Typography>
                    </Box>

                    <Typography sx={{ fontSize: "0.9rem", color: "#000000" }}>
                      {job.summary.length > 120
                        ? job.summary.slice(0, 120) + "..."
                        : job.summary}
                    </Typography>
                  </CardContent>

                  {/* Apply Button */}
                  <Box sx={{ mt: "auto", textAlign: "left", px: 2, pb: 2 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        navigate("/job-details", { state: { job } })
                      }
                      sx={{
                        backgroundColor: "#0d3b66",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#093052" },
                      }}
                    >
                      Apply Now
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
