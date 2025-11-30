import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import DynamicHeroSection from "../Componets/DynamicHeroSection";
import serviceheader from "../assets/serviceheader.jpg";
import serviceimg from "../assets/serviceimg.jpg";
import { Helmet } from "react-helmet";

const faqs = [
  {
    question: "What Is the Future of Web Development?",
    answer:
      "The future of web development lies in AI-driven automation, headless CMS, and frameworks like Next.js that enable faster, scalable, and personalized digital experiences.",
  },
  {
    question: "What Is the Future of Artificial Intelligence?",
    answer:
      "AI will continue transforming industries with advancements in machine learning, predictive analytics, and natural language processing, making automation more human-like.",
  },
  {
    question: "How Is Cloud Computing Shaping Businesses?",
    answer:
      "Cloud computing enables scalability, flexibility, and cost reduction, empowering businesses to innovate faster and manage workloads efficiently across distributed environments.",
  },
  {
    question: "What Role Does Cybersecurity Play in Modern IT?",
    answer:
      "Cybersecurity is now a fundamental part of every digital strategy, ensuring the protection of data, user trust, and business continuity in a hyperconnected world.",
  },
  {
    question: "How Are Low-Code Platforms Changing Development?",
    answer:
      "Low-code and no-code tools allow teams to create apps faster, bridging the gap between developers and business users without compromising quality or scalability.",
  },
  {
    question: "Why Is User Experience (UX) Design Important?",
    answer:
      "UX design focuses on creating seamless interactions that improve user satisfaction, accessibility, and engagement — essential for retaining customers and brand success.",
  },
  {
    question: "What Is the Future of Automation and Robotics?",
    answer:
      "Automation and robotics will redefine efficiency across industries, combining AI, IoT, and robotics to handle complex, real-time decision-making processes.",
  },
];
const steps = [
  {
    id: 1,
    title: "Identifying Problems",
    desc: "We analyze your business challenges and identify opportunities for improvement.",
  },
  {
    id: 2,
    title: "Research Your Problem",
    desc: "Our team performs in-depth research to understand your needs and technical gaps.",
  },
  {
    id: 3,
    title: "Solutions Your Problem",
    desc: "We design and develop efficient, scalable, and secure solutions for your business.",
  },
  {
    id: 4,
    title: "Consultation With Experts",
    desc: "Collaborate with our experienced professionals to refine and deploy your solution.",
  },
];
const services = [
  {
    id: 1,
    title: "Cybersecurity",
    description:
      "IT company that provides a seamless and intuitive experience for users. The design focuses on secure and smooth navigation.",
    icon: "🛡️",
  },
  {
    id: 2,
    title: "Cloud Solutions",
    description:
      "We provide scalable cloud infrastructure and migration services for modern businesses.",
    icon: "☁️",
  },
  {
    id: 3,
    title: "IT Consulting",
    description:
      "Expert guidance on technology adoption, digital transformation, and IT modernization.",
    icon: "💼",
  },
  {
    id: 4,
    title: "Tech Consulting",
    description:
      "Consulting services for digital platforms, automation, and IT process improvement.",
    icon: "📍",
  },
  {
    id: 5,
    title: "Sphere Solutions",
    description:
      "Providing end-to-end product development and integration services across industries.",
    icon: "🛒",
  },
  {
    id: 6,
    title: "Path Technologies",
    description:
      "Helping enterprises adopt innovative and scalable technologies for their growth.",
    icon: "👥",
  },
  {
    id: 7,
    title: "Digital Systems",
    description:
      "Empowering organizations with modern digital ecosystems and transformation strategies.",
    icon: "🔍",
  },
];
export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  // animation variants for description (same timing as scale)
  const descVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };
  const [hovered, setHovered] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const accessKey = "YOUR_WEB3FORMS_ACCESS_KEY";

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Submitting your query...", { id: "submit" });

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        ...formData,
      }),
    });

    const result = await res.json();
    toast.dismiss("submit");

    if (result.success) {
      toast.success("Your query has been submitted successfully!");
      setFormData({ name: "", email: "", department: "" });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Services – Digital Deta</title>
        <meta
          name="description"
          content="Explore our professional digital services including web development, branding, and marketing."
        />
      </Helmet>

      <DynamicHeroSection
        title="OUR"
        highlight="SERVICES"
        description="Explore our range of cutting-edge solutions designed to help your business thrive in a digital-first world."
        bgImage={serviceheader}
        accentColor="#0d3b66"
      />
      <section className="relative bg-white text-gray-900 py-20 px-6 md:px-16 lg:px-24 overflow-hidden">
        <Toaster position="top-center" reverseOrder={false} />

        {/* Background floating accents */}
        <motion.div
          className="absolute top-[-50px] left-[-80px] w-[300px] h-[300px] blur-3xl opacity-20"
          animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-100px] right-[-80px] w-[350px] h-[350px] bg-gradient-to-tl from-[#0066ff] to-[#00ffb3] rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Section */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Transforming <br />
              <span className="text-[#0d3b66]">DigitalDeta</span> Solutions
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
              We deliver future-ready IT solutions — from Salesforce and cloud
              systems to intelligent automation and modern web applications that
              empower businesses to grow efficiently.
            </p>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-gray-100"
          >
            <h2 className="text-3xl font-bold text-center text-[#0b1957] mb-3">
              Book a Consultation
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Let’s discuss how we can build your next great digital product.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#144b85] outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#144b85] outline-none transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Select Department
                </label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#144b85] outline-none transition"
                >
                  <option value="">Choose...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Salesforce Solutions">
                    Salesforce Solutions
                  </option>
                  <option value="Cloud Services">Cloud Services</option>
                  <option value="Automation">Automation</option>
                </select>
              </div>

              <motion.button className="w-full bg-[#0d3b66] text-white py-3.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                Submit Query
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      {/* Cards */}
      <div className="min-h-screen bg-[#f8f3ec] px-4 py-12 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our <span className="text-[#0d3b66]">Services</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Hover a card to expand it smoothly (responsive & clean)
            </p>
          </div>

          {/* Flex container instead of grid for smooth width animation */}
          <div className="flex flex-wrap justify-center gap-6 transition-all duration-300">
            {services.map((s) => {
              const isHovered = hovered === s.id;

              return (
                <motion.div
                  key={s.id}
                  onMouseEnter={() => !isMobile && setHovered(s.id)}
                  onMouseLeave={() => !isMobile && setHovered(null)}
                  onClick={() => {
                    if (isMobile)
                      setHovered((prev) => (prev === s.id ? null : s.id));
                  }}
                  animate={{
                    flex: isHovered
                      ? "1.2 1 300px" // expands nicely
                      : "1 1 260px", // base size
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative bg-[#fcfaf6] border border-[#e1dcd3] rounded-2xl shadow-sm p-6 cursor-pointer overflow-hidden transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Background number */}
                  <span className="absolute top-4 right-6 text-[70px] font-extrabold text-gray-200 select-none">
                    {String(s.id).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-lg bg-white/70 text-2xl">
                    {s.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    {s.title}
                  </h3>

                  {/* Description appears only when expanded */}
                  <AnimatePresence>
                    {(isHovered || isMobile) && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="text-gray-700 text-sm leading-relaxed"
                      >
                        {s.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Bottom line animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#144b85] via-[#144b85] to-[#144b85] rounded-full"
                    animate={{ width: isHovered ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Work Process */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Our <span className="text-[#0d3b66]">Work Process</span>
          </h2>

          {/* Steps */}
          <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0">
            {/* Connecting Curved Line (Visible on larger screens) */}
            <svg
              className="hidden md:block absolute top-16 left-0 w-full h-32"
              viewBox="0 0 1200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,100 C300,0 600,200 900,100 C1050,50 1200,150 1200,150"
                stroke="#d1d5db"
                strokeWidth="2"
                strokeDasharray="6 6"
                fill="none"
                markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="8"
                  markerHeight="8"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <path
                    d="M0,0 L4,2 L0,4"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="1"
                  />
                </marker>
              </defs>
            </svg>

            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center text-center max-w-[240px] relative"
              >
                {/* Number Circle */}
                <motion.div
                  whileHover={{
                    backgroundColor: "#0d3b66",
                    color: "#ffffff",
                    borderColor: "#007bff",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-gray-300 text-2xl font-bold text-gray-400 bg-white shadow-md mb-6"
                >
                  {String(step.id).padStart(2, "0")}
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===============FAQ============ */}
      <section className="bg-[#fcf9f4] py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Empower Your{" "}
            <span className="text-[#0d3b66] underline decoration-red-500">
              Growth
            </span>{" "}
            With Technology
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            We provide seamless and intuitive digital solutions focused on clear
            navigation, innovative design, and easy access to information.
          </p>

          {/* Accordion */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-6 py-5 "
                >
                  <span className="font-semibold text-gray-900 hover:text-[#144b85] hover:cursor-pointer text-base md:text-lg">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="text-gray-600 w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <div className="px-6 pb-5 text-gray-600 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================== Book Appointment Section ================== */}
      <section className="bg-[#f9f9f9] py-20 px-6 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book an <span className="text-[#0d3b66]">Appointment</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Let’s make your vision come to life. Schedule an appointment with
              our expert team and start your journey toward digital success.
            </p>
            <motion.img
              src={serviceimg}
              alt="Appointment Illustration"
              className="w-60 md:w-96 mx-auto md:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Right Section - Form */}
          <motion.form
            onSubmit={async (e) => {
              e.preventDefault();
              toast.loading("Submitting...", { id: "submit" });

              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData.entries());

              const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  access_key: "YOUR_WEB3FORMS_ACCESS_KEY",
                  ...data,
                }),
              });

              const result = await res.json();
              toast.dismiss("submit");

              if (result.success) {
                toast.success("Appointment request submitted!");
                e.target.reset();
              } else {
                toast.error("Submission failed. Try again later.");
              }
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:text-[#0d3b66] outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:text-[#0d3b66] outline-none transition"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 00000 00000"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:text-[#0d3b66] outline-none transition"
                />
              </div>

              {/* Service Type */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Service Type
                </label>
                <select
                  name="service"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:text-[#0d3b66] outline-none transition"
                >
                  <option value="">Select...</option>
                  <option value="Web Development">Web Development</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="App Development">App Development</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2 flex flex-col">
                <label className="text-gray-700 font-semibold mb-2">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  placeholder="Write your message..."
                  className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:ring-2 focus:text-[#0d3b66] outline-none transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-6 w-full  hover:bg-[#0d3b66] hover:cursor-pointer hover:text-white text-black font-semibold py-3 px-6 rounded-lg shadow-md transition"
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
