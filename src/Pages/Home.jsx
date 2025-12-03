// Home.jsx
import React, { useState, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  Paper,
  Button,
  CardContent,
  CardMedia,
  Rating,
  useTheme,
  useMediaQuery,
  IconButton,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import whoWeAreImg from "../assets/whoweare.jpg";
import whatWeDoImg from "../assets/whatwedo.jpg";
import ourVisionImg from "../assets/ourvision.jpg";
import slide from "../assets/slide1.jpg";
import slide2 from "../assets/slide2.jpg";
import service1 from "../assets/service1.jpg";
import service2 from "../assets/service2.jpg";
import service3 from "../assets/service3.jpg";
import service4 from "../assets/service4.jpg";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import project4 from "../assets/project4.jpg";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Helmet } from "react-helmet";

// -----------------------------
// Styled components & motion
// -----------------------------
const HoverCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  border: "2px solid transparent",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    border: "2px solid #0d3b66",
    boxShadow: "0 8px 20px rgba(230,57,70,0.2)",
    transform: "translateY(-5px)",
  },
}));
const MotionBox = motion(Box);

// -----------------------------
// Data (kept in one place)
// -----------------------------
const items = [
  {
    title: "Who We Are",
    img: whoWeAreImg,
    desc: "We are a technology-driven IT services and software development company dedicated to helping businesses thrive in the digital era. With a strong focus on innovation, engineering excellence, and customer satisfaction, we deliver tailor-made solutions that solve real business challenges and accelerate growth.",
    list: [
      "Experienced team of developers, architects, designers, and analysts",
      "Experts in modern technologies and scalable digital solutions",
      "Focused on delivering high-quality, performance-driven software",
      "Customer-centric approach with transparency .",
    ],
  },
  {
    title: "What We Do",
    img: whatWeDoImg,
    desc: "We build scalable software solutions using modern technologies, empowering clients with products that are fast, secure, and future-ready.",
    list: [
      "Custom Web & Mobile App Development",
      "Full-Stack Development (React, Node, MongoDB etc.)",
      "Enterprise Software & Product Engineering",
      "UI/UX Design & Digital Experience",
      "Cloud, DevOps & Integration Services",
    ],
  },
  {
    title: "Our Vision",
    img: ourVisionImg,
    desc: "To become a global leader in digital innovation, empowering businesses with technology that drives growth, efficiency, and long-term success.",
    list: [
      "To make technology accessible, scalable, and impactful for all businesses",
      "To continuously innovate and adapt to emerging digital trends",
      "To help companies transition into fully digital, automated ecosystems",
      "To create sustainable, future-ready digital solutions",
    ],
  },
];

const slides = [
  {
    id: 1,
    image: slide,
    title: "Digital Deta — Redefining Possibilities Through Technology",
    subtitle:
      "We help businesses unlock intelligence with AI-powered solutions, cloud modernization, advanced automation, and future-ready digital platforms.",
    description:
      "From strategy to execution, we partner with businesses to accelerate transformation, enhance customer experiences, and drive measurable growth.",
    button: "Discover More",
    link: "/about",
  },
  {
    id: 2,
    image: slide2,
    title: "Innovating Tomorrow With Smart, Scalable & Secure Solutions",
    subtitle:
      "Custom Web Development • Mobile Apps • AI/ML Engineering • Cloud Architecture • Automation • Digital Marketing",
    description:
      "At Digital Deta, we design cutting-edge digital products that elevate brands, optimize operations, and deliver next-level business value.",
    button: "Our Services",
    link: "/services",
  },
];

const solutions = [
  {
    title: "Digital Marketing",
    desc: "Boost your brand’s online impact with our result-driven digital marketing services.",
    modalText:
      "Digital Deta will provide this type of service by building a strong online presence, targeting the right audience, and implementing advanced marketing tools to boost your brand visibility.",
    img: service1,
    points: [
      "SEO & SEM Optimization",
      "Social Media Advertising",
      "Brand & Online Reputation Management",
      "Lead Generation Campaigns",
      "Content Strategy & Planning",
    ],
  },
  {
    title: "Managed IT Services",
    desc: "Professional IT solutions to keep your business running smoothly.",
    modalText:
      "Digital Deta will provide this service by managing your IT infrastructure, ensuring security, and offering 24/7 technical support for uninterrupted operations.",
    img: service2,
    points: [
      "IT Infrastructure Monitoring",
      "Data Backup & Disaster Recovery",
      "Cloud Management Services",
      "Hardware & Software Support",
    ],
  },
  {
    title: "Project Development",
    desc: "Complete end-to-end project development tailored for your brand.",
    modalText:
      "Digital Deta will provide this service by planning, designing, and building software projects that meet your business goals efficiently.",
    img: service3,
    points: [
      "Project Planning & Documentation",
      "System Design & Architecture",
      "Agile Development Process",
      "Quality Assurance & Testing",
      "Maintenance & Continuous Updates",
    ],
  },
  {
    title: "App Development",
    desc: "Custom applications built for performance and user experience.",
    modalText:
      "Digital Deta will provide this service by creating mobile and web applications that are fast, scalable, and aligned with your business requirements.",
    img: service4,
    points: [
      "Android & iOS App Development",
      "API & Backend Development",
      "UI/UX Design for Apps",
      "App Performance Optimization",
      "App Deployment & Support",
    ],
  },
];

const projects = [
  {
    title: "Market Solution This Consulting Projects",
    desc: "Business tailored design of this in some we form solution.",
    img: project1,
  },
  {
    title: "Creative Marketing Strategy",
    desc: "Empowering brand identity and business growth.",
    img: project2,
  },
  {
    title: "Team Collaboration Success",
    desc: "Delivering results through innovation and teamwork.",
    img: project3,
  },
  {
    title: "Design Thinking Workshop",
    desc: "Creative solutions with user-focused insights.",
    img: project4,
  },
];

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Amit Sharma",
    rating: 5,
    // img: "https://randomuser.me/api/portraits/men/75.jpg",
    feedback:
      "Digital Deta helped us build a professional website that transformed our online presence. Their team was quick, skilled, and extremely responsive.",
  },
  {
    name: "Priya Nair",
    role: "Priya Nair",
    rating: 5,
    // img: "https://randomuser.me/api/portraits/women/67.jpg",
    feedback:
      "Their social media handling boosted our brand engagement significantly. Creative posts, consistent strategy, and measurable growth — highly recommended!",
  },
  {
    name: "Rohan Verma",
    role: "Rohan Verma",
    rating: 5,
    // img: "https://randomuser.me/api/portraits/men/41.jpg",
    feedback:
      "We hired Digital Deta for mobile app development and they delivered a smooth, user-friendly app on time. Great UI, great performance.",
  },
  {
    name: "Sneha Patil",
    role: "Sneha Patil",
    rating: 4,
    // img: "https://randomuser.me/api/portraits/women/12.jpg",
    feedback:
      "They redesigned our website and improved load speed drastically. The project was handled professionally and the results were impressive.",
  },
  {
    name: "Arjun Mehta",
    role: "Arjun Mehta",
    rating: 5,
    // img: "https://randomuser.me/api/portraits/men/22.jpg",
    feedback:
      "Excellent team! Their IT services helped automate our workflow and improved productivity. We plan to work with them long-term.",
  },
];

// -----------------------------
// Home component
// -----------------------------
export default function Home() {
  const navigate = useNavigate();

  const AnimatedHeading = ({ text }) => {
    const letters = text.split("");

    return (
      <motion.div
        className="flex flex-wrap justify-center text-center text-4xl md:text-5xl mb-4 font-bold text-[#0b1739]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: "easeOut" },
              },
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  const [active, setActive] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(null); // Mobile click
  const [selected, setSelected] = useState(null);

  const testimonialsRef = useRef(null);

  // scroll direction helper — used by testimonial arrow buttons
  const scrollTestimonials = (direction = "right") => {
    const el = testimonialsRef.current;
    if (!el) return;
    const distance = Math.floor(el.clientWidth * 0.8);
    if (direction === "left") {
      el.scrollBy({ left: -distance, behavior: "smooth" });
    } else {
      el.scrollBy({ left: distance, behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>Home – Digital Deta</title>
        <meta
          name="description"
          content="We deliver high-quality digital solutions for modern businesses."
        />
      </Helmet>
      <Box>
        {/* ================= HERO ================= */}
        <Box
          component="section"
          aria-label="hero"
          sx={{ position: "relative" }}
        >
          <div className="relative w-full h-screen bg-black text-white">
            <Swiper
              modules={[EffectFade, Pagination, Autoplay]}
              effect="fade"
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              className="h-full"
            >
              {slides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    {/* Dark Gradient Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.3))",
                        zIndex: 1,
                      }}
                    />

                    {/* Animated Text Content */}
                    <MotionBox
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1 }}
                      sx={{
                        position: "relative",
                        zIndex: 3,
                        px: { xs: 4, md: 10 },
                        maxWidth: { xs: "100%", md: "650px", lg: "750px" },
                      }}
                    >
                      {/* Title with smooth fade animation */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        <Typography
                          component="h1"
                          sx={{
                            fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
                            fontWeight: 700,
                            lineHeight: 1.2,
                            mb: 2,
                          }}
                        >
                          {slide.title}
                        </Typography>
                      </motion.div>

                      {/* Subtitle */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 3,
                            color: "grey.300",
                            fontSize: { xs: "1rem", md: "1.3rem" },
                          }}
                        >
                          {slide.subtitle}
                        </Typography>
                      </motion.div>

                      {/* Description (optional, auto-hidden if not provided) */}

                      {/* Button */}
                      <MotionBox whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: "#fff",
                            color: "#fff",
                            px: { xs: 3, md: 4 },
                            py: 1.2,
                            borderRadius: 2,
                            fontSize: { xs: "0.8rem", md: "1rem" },
                            "&:hover": { bgcolor: "#fff", color: "#000" },
                          }}
                          aria-label={slide.button}
                          onClick={() => navigate(slide.link)}
                        >
                          {slide.button}
                        </Button>
                      </MotionBox>
                    </MotionBox>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Box>

        {/* ================= WHO WE ARE / WHAT WE DO / OUR VISION ================= */}
        <div className="w-full mt-9 px-9 flex flex-col lg:flex-row overflow-hidden gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => !isMobile && setActive(i)}
              onMouseLeave={() => !isMobile && setActive(null)}
              onClick={() =>
                isMobile && setMobileOpen(mobileOpen === i ? null : i)
              }
              className={`
            relative h-[55vh] lg:h-[75vh]
            rounded-xl overflow-hidden cursor-pointer
            transition-all duration-500 ease-in-out

            /* Desktop dynamic width */
            ${!isMobile && (active === null ? "lg:flex-1" : "")}
            ${!isMobile && active === i ? "lg:flex-3" : ""}
            ${
              !isMobile && active !== null && active !== i
                ? "lg:flex-[1.2]"
                : ""
            }

            /* Mobile full-width */
            w-full
          `}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center brightness-80"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>

              {/* Mobile: Tap to open CONTENT PANEL */}
              {isMobile && (
                <div
                  className={`
                absolute inset-0 bg-white p-6 overflow-y-auto
                transition-all duration-500 ease-in-out
                ${
                  mobileOpen === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-full"
                }
              `}
                >
                  <h2 className="text-3xl font-bold text-[#0b1739] mb-4">
                    {item.title}
                  </h2>

                  <ul className="space-y-3  leading-relaxed">
                    {item.list.map((l, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#0b1739]">›</span>
                        {l}
                      </li>
                    ))}
                  </ul>

                  {/* <div className="mt-6 flex gap-4">
                  <button className="px-5 py-2 bg-[#0b1739] text-white rounded-md">
                    CALL NOW
                  </button>
                  <button className="px-5 py-2 border-2 border-[#0b1739] text-[#0b1739] rounded-md">
                    EXPLORE
                  </button>
                </div> */}
                </div>
              )}

              {/* Desktop: Hover expand LEFT PANEL */}
              <div
                className={`
              hidden lg:block absolute left-0 top-0 h-full bg-white
              transition-all duration-500 ease-in-out p-10 overflow-y-auto
              ${active === i ? "w-[45%] opacity-100" : "w-0 opacity-0"}
            `}
              >
                <h2 className="text-4xl font-bold text-[#0b1739] mb-6">
                  {item.title}
                </h2>

                <ul className="space-y-4">
                  {item.list.map((l, idx) => (
                    <li key={idx} className="flex gap-3 text-black/90">
                      <span className="text-red-600">›</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile title overlay */}
              {!isMobile && (
                <div
                  className={`
                absolute bottom-6 left-6 text-white text-2xl  
                ${active === i ? "opacity-0" : "opacity-100"}
              `}
                >
                  {item.title}
                </div>
              )}

              {isMobile && (
                <div className="absolute bottom-0 w-full p-4 bg-black/50 text-white text-xl font-semibold">
                  {item.title}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* ================= PROJECTS / WORKS ================= */}
        <Box
          component="section"
          sx={{
            py: 10,
            px: { xs: 2, md: 6 },
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          {/* Title with lines */}
          <Typography
            variant="overline"
            sx={{
              color: "#0d3b66",
              fontWeight: 700,
              letterSpacing: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 1,
              "&::before, &::after": {
                content: '""',
                display: "inline-block",
                width: "25px",
                height: "2px",
                backgroundColor: "#0d3b66",
                mx: 1.5,
              },
            }}
          >
            OUR BEST PROJECTS
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 6,
              fontSize: {
                xs: "2.5rem", // text-5xl (mobile)
                md: "3rem", // md:text-5xl
              },
              lineHeight: "1.9", // leading-tight
            }}
          >
            <AnimatedHeading text="Our Projects" />
          </Typography>

          {/* Grid Layout */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 3,
            }}
          >
            {projects.map((p, i) => (
              <MotionBox
                key={p.title + i}
                whileHover={!isMobile ? { scale: 1.03 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onClick={() => {
                  if (isMobile) setMobileOpen(mobileOpen === i ? null : i);
                }}
                sx={{ cursor: "pointer" }}
              >
                <Card
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "16px",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Main Image */}
                  <CardMedia
                    component="img"
                    image={p.img}
                    alt={p.title}
                    sx={{
                      height: 360,
                      transition: "transform 0.5s ease",
                      "&:hover": !isMobile && {
                        transform: "scale(1.08)",
                      },
                    }}
                  />

                  {/* Overlay Content */}
                  <MotionBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isMobile
                        ? mobileOpen === i
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                        : {}
                    }
                    whileHover={!isMobile ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4 }}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(60,7,90,0.9), rgba(20,57,230,0.5))",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                      textAlign: "left",
                      opacity: 0,
                      // FIX: remove pointerEvents block (stopped hover on desktop)
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 200, mb: 1, lineHeight: 1.3 }}
                    >
                      {p.title}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 3 }}>
                      {p.desc}
                    </Typography>

                    <Button
                      sx={{
                        backgroundColor: "#0b1739",
                        color: "#fff",
                        borderRadius: "50%",
                        minWidth: 0,
                        width: 40,
                        height: 40,
                        "&:hover": { backgroundColor: "#0b1739" },
                        alignSelf: "flex-start",
                      }}
                    >
                      <ArrowForwardIcon />
                    </Button>
                  </MotionBox>
                </Card>
              </MotionBox>
            ))}
          </Box>
        </Box>
        {/* ================= SOLUTIONS / CENTER-IMAGE LAYOUT ================= */}
        <section className="py-16 px-4 md:px-10 lg:px-20">
          <h3 className="font-bold text-4xl text-center pb-11">
            <AnimatedHeading text="Our Service" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((s, index) => (
              <div
                key={index}
                className="
        relative w-full h-72 rounded-xl overflow-hidden cursor-pointer 
        shadow-[0px_4px_22px_rgba(0,0,0,1)] 
        transition-all duration-500 group
      "
              >
                {/* Image */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="
          w-full h-full object-cover 
          transition-all duration-700 
          group-hover:scale-110 
          group-hover:blur-sm
        "
                />

                {/* Hover dark overlay */}
                <div
                  className="
          absolute inset-0 
          bg-black/40 
          opacity-0 
          group-hover:opacity-80 
          transition-all duration-500 
          z-10
        "
                ></div>

                {/* Bottom gradient */}
                <div
                  className="
          absolute bottom-0 left-0 right-0 
          h-32 bg-gradient-to-t 
          from-black/80 via-black/40 to-transparent
          z-20
        "
                ></div>

                {/* Title */}
                <h3
                  className="
          absolute bottom-6 left-6 
          text-white text-xl font-semibold z-30
        "
                >
                  {s.title}
                </h3>

                {/* Hover content */}
                <div
                  className="
          absolute bottom-14 left-6 right-6
          opacity-0 translate-y-4 
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-500
          z-30
        "
                >
                  <p className="text-white/90 text-sm mb-2">{s.desc}</p>

                  <button
                    className="text-purple-300 hover:text-white hover:cursor-pointer text-sm font-medium"
                    onClick={() => setSelected(s)}
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
      fixed inset-0 bg-black/60 backdrop-blur-sm 
      flex justify-center items-center z-[999] p-4
    "
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="
        bg-white 
        w-full sm:w-[90%] md:w-[70%] lg:w-[45%] xl:w-[40%] 
        max-h-[90vh] overflow-y-auto
        rounded-2xl p-6 relative
      "
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="
          absolute top-0 right-2 md:top-4 hover:cursor-pointer md:right-2 lg:top-0 lg:right-2 
          text-black hover:text-red-600 
          text-2xl
        "
                  onClick={() => setSelected(null)}
                >
                  ×
                </button>

                {/* Image */}
                <img
                  src={selected.img}
                  className="
          w-full 
          h-40  md:h-28 lg:h-40
          object-cover rounded-xl mb-4
        "
                />

                {/* Title */}
                <h2 className="text-xl sm:text-2xl text-[#0b1739] font-bold mb-2">
                  {selected.title}
                </h2>

                {/* Custom Intro Text */}
                <p className="text-[#0b1739] text-sm mb-3 leading-relaxed">
                  <span className="font-semibold">Digital Deta</span> provides
                  this type of service to help businesses grow, improve
                  efficiency, and achieve digital transformation with reliable
                  and innovative solutions.
                </p>

                {/* Description */}
                <p className="text-black leading-relaxed text-sm sm:text-base">
                  {selected.desc}
                </p>

                {/* Points */}
                {selected.points && (
                  <ul className="list-disc ml-5 mt-3 space-y-1 text-black text-sm sm:text-base">
                    {selected.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          )}
        </section>
        {/* ================= TESTIMONIALS ================= */}
        <Box
          component="section"
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            px: { xs: 2, sm: 3, md: 6 },
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "#0d3b66",
              fontWeight: 700,
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
            }}
          >
            OUR TESTIMONIALS
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mt: 1,
              fontSize: { xs: "1.6rem", sm: "2.8rem", md: "2.4rem" },
            }}
          >
            <AnimatedHeading text=" What Our Clients Say" />
          </Typography>

          {/* Arrows */}
          <IconButton
            onClick={() => scrollTestimonials("left")}
            sx={{
              position: "absolute",
              top: { xs: "66%", sm: "60%" },
              left: { xs: 2, sm: 10, md: 12 },
              transform: "translateY(-50%)",
              background: "#0d3b66",
              color: "#fff",
              p: { xs: 0.4, sm: 1 },
              "&:hover": { background: "#c5303d" },
              zIndex: 3,
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: { xs: 14, sm: 20 } }} />
          </IconButton>

          <IconButton
            onClick={() => scrollTestimonials("right")}
            sx={{
              position: "absolute",
              top: { xs: "66%", sm: "60%" },
              right: { xs: 2, sm: 10, md: 12 },
              transform: "translateY(-50%)",
              background: "#0d3b66",
              color: "#fff",
              p: { xs: 0.4, sm: 1 },
              "&:hover": { background: "#c5303d" },
              zIndex: 3,
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: { xs: 14, sm: 20 } }} />
          </IconButton>

          {/* Scrollable List */}
          <Box
            ref={testimonialsRef}
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3, md: 4 },
              overflowX: "auto",
              scrollBehavior: "smooth",
              px: { xs: 1, sm: 2 },
              pb: { xs: 2, sm: 8 },
              pt: { xs: 2, sm: 8 },
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            {testimonials.map((t, i) => (
              <MotionBox
                key={t.name + i}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(20, 7, 230, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                sx={{ flexShrink: 0 }}
              >
                <Card
                  sx={{
                    borderRadius: "20px",
                    border: "1.5px solid #222",
                    width: { xs: 210, sm: 240, md: 300 },
                    height: { xs: 260, sm: 280, md: 270 },
                    position: "relative",
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      {/* Avatar */}
                      <Box sx={{ position: "relative", mr: 2 }}>
                        <Avatar
                          src={t.img}
                          alt={t.name}
                          sx={{
                            width: { xs: 45, sm: 60, md: 70 },
                            height: { xs: 45, sm: 60, md: 70 },
                            border: "3px solid #0d3b66",
                          }}
                        />

                        {/* Quote Icon */}
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: -4,
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#0d3b66",
                            borderRadius: "50%",
                            width: { xs: 16, sm: 20, md: 22 },
                            height: { xs: 16, sm: 20, md: 22 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FormatQuoteIcon
                            sx={{
                              fontSize: { xs: 10, sm: 12, md: 14 },
                              color: "#fff",
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Name + Role */}
                      <Box>
                        <Rating
                          value={t.rating}
                          readOnly
                          size="small"
                          sx={{ color: "#0d3b66", mb: 0.5 }}
                        />

                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "#fff",
                            fontSize: { xs: "0.85rem", sm: "1rem" },
                          }}
                        >
                          {t.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#0d3b66",
                            fontSize: { xs: "0.7rem", sm: "0.85rem" },
                          }}
                        >
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Feedback */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#222",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                        fontSize: { xs: "0.75rem", sm: "0.9rem" },
                      }}
                    >
                      {t.feedback}
                    </Typography>
                  </CardContent>

                  {/* Corner Decoration */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 0,
                      height: 0,
                      borderLeft: "40px solid transparent",
                      borderTop: "40px solid #0d3b66",
                    }}
                  />
                </Card>
              </MotionBox>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
