import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import DynamicHeroSection from "../Componets/DynamicHeroSection";
import contactus from "../assets/contactus.jpg";

export default function ContactSection() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading("Sending your message...", { id: "sending" });

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "fda25b7a-e121-4e0b-9636-543cb6adb80d",
        subject: `New Contact Request from ${data.name}`,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      }),
    });

    const result = await res.json();
    toast.dismiss("sending");

    if (result.success) {
      toast.success("Message sent successfully!");
      e.target.reset();
    } else {
      toast.error(result.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-[#fff9f3]">
      <DynamicHeroSection
        title="GET IN"
        highlight="TOUCH"
        description="We’d love to hear from you! Reach out to discuss your project, partnership, or collaboration."
        bgImage={contactus}
        accentColor="#0d3b66"
      />

      <Toaster position="top-center" />

      {/* FIXED RESPONSIVE WRAPPER */}
      <div className="max-w-7xl mx-auto mb-12 px-6 md:px-16 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CONTACT INFO */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
          >
            Contact <span className="text-[#0d3b66]">Us</span>
          </motion.h2>

          {[
            {
              icon: <Mail size={24} className="text-[#0d3b66]" />,
              title: "Email",
              lines: ["info@digitaldeta.com"],
            },
            {
              icon: <Phone size={24} className="text-[#0d3b66]" />,
              title: "Contact",
              lines: ["80936 33105", "78737 75777"],
            },
            {
              icon: <MapPin size={24} className="text-[#0d3b66]" />,
              title: "Location",
              lines: ["B-53, Janpath, Sahid Nagar, Odisha"],
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex items-center bg-white p-4 md:p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mr-4">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-1">
                  {item.title}
                </h3>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-gray-600 text-sm md:text-base">
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CONTACT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center">
            Send Your <span className="text-[#0d3b66]">Message</span>
          </h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#fff9f3]"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#fff9f3]"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-[#fff9f3]"
              />
            </div>

            <textarea
              name="message"
              required
              placeholder="Message"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 h-32 bg-[#fff9f3]"
            />

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#0d3b66] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#0b3154] transition-all"
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
