import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import applaynowbg from "../assets/applaynowbg.webp";

export default function ApplyNow() {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    portfolio: "",
    resumeLink: "",
    message: "",
  });

  const positions = [
    "React Developer",
    "Full Stack Developer",
    "Java Developer",
    "Graphics Designer ",
    "UI/UX Designer",
  ];

  // Prefill logic
  useEffect(() => {
    const pending =
      location.state?.jobTitle || sessionStorage.getItem("pendingJob");

    if (!auth.currentUser && pending) {
      navigate("/login");
      return;
    }

    if (location.state?.jobTitle) {
      setFormData((prev) => ({
        ...prev,
        position: location.state.jobTitle,
      }));
    }

    const user = auth.currentUser;
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 10) {
        setFormData((prev) => ({ ...prev, phone: cleaned }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Handler (Web3Forms)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!formData.resumeLink.trim()) {
      toast.error("Please provide a resume link!");
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();

      form.append("access_key", "fda25b7a-e121-4e0b-9636-543cb6adb80d");
      form.append("subject", `Job Application — ${formData.position}`);
      form.append("from_name", formData.name);
      form.append("from_email", formData.email);

      Object.keys(formData).forEach((key) => form.append(key, formData[key]));

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const json = await res.json();

      if (!json.success) {
        toast.error(json.message || "Submission failed!");
        setLoading(false);
        return;
      }

      toast.success("Application submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        portfolio: "",
        resumeLink: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error submitting form!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white">
      <Toaster position="top-right" />

      {/* LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden ms-6 mt-16 md:flex w-1/2 h-screen items-center justify-center relative"
      >
        <div
          className="absolute inset-0 opacity-20 bg-cover"
          style={{ backgroundImage: `url(${applaynowbg})` }}
        ></div>
        <div className="relative text-center px-8">
          <h1 className="text-4xl font-bold mb-4">
            Join <span className="text-indigo-500">Digital Deta</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-md mx-auto">
            Build your future with us! Work with modern technology and an
            amazing team.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE FORM */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex mt-12 justify-center items-center p-6"
      >
        <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-3xl font-semibold mb-2">Apply Now</h2>
          <p className="text-gray-300 mb-6">
            Fill the details carefully and provide your resume link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm">Phone Number *</label>
              <input
                type="text"
                name="phone"
                maxLength="10"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Position */}
            <div>
              <label className="text-sm">Position Applying For *</label>
              <select
                name="position"
                required
                value={formData.position}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              >
                <option value="" disabled>
                  Select a position
                </option>

                {positions.map((pos) => (
                  <option key={pos} value={pos} className="text-black">
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm">Years of Experience *</label>
              <input
                type="text"
                name="experience"
                required
                value={formData.experience}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="text-sm">Portfolio / GitHub / LinkedIn</label>
              <input
                type="text"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Resume Link */}
            <div>
              <label className="text-sm">Resume / CV Link *</label>
              <input
                type="text"
                name="resumeLink"
                required
                value={formData.resumeLink}
                onChange={handleChange}
                placeholder="Google Drive / Dropbox / Website link"
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm">Additional Message</label>
              <textarea
                name="message"
                rows="3"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/20 focus:border-indigo-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
