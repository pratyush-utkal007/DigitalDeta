import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "./Componets/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Career from "./Pages/Career";
import Footer from "./Componets/Footer";
import ChatBotContainer from "./ChatBot/ChatBotContainer";
import CookieConsent from "./Componets/CookieConsent";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import ApplyNow from "./Pages/ApplyNow";
import JobDetails from "./Pages/JobDetails";

export default function App() {
  const { pathname } = useLocation();

  // ⭐ Scroll to Top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      {/* ⭐ GLOBAL SEO (applies to entire website) */}
      <Helmet>
        <title>Digital Deta – IT Services & Digital Solutions</title>

        <meta
          name="description"
          content="Digital Deta provides web development, app development, digital marketing, branding, and business automation services to help businesses grow."
        />

        <meta
          name="keywords"
          content="Digital Deta, IT services, web development, app development, digital marketing, branding, automation, tech company"
        />

        <meta name="author" content="Digital Deta" />

        {/* OpenGraph SEO */}
        <meta
          property="og:title"
          content="Digital Deta – Professional IT Solutions"
        />
        <meta
          property="og:description"
          content="We build websites, apps, and digital solutions for businesses across the world."
        />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://digitaldeta.com" />
        <meta property="og:type" content="website" />

        {/* Twitter SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digital Deta – IT Services & Creative Solutions"
        />
        <meta
          name="twitter:description"
          content="Your trusted IT partner for websites, apps, automation, and marketing."
        />
        <meta name="twitter:image" content="/images/og-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://digitaldeta.com" />
      </Helmet>

      <Navbar />
      <CookieConsent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/job-details" element={<JobDetails />} />
        <Route path="/apply-now" element={<ApplyNow />} />
      </Routes>

      <ChatBotContainer />
      <Footer />
    </>
  );
}
