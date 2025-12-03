import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ FIXED import

export default function Footer() {
  return (
    <footer className="mt-[-10px] via-gray-50 to-gray-100 text-gray-700 pt-20 pb-10 px-0 md:px-0 lg:px-0 overflow-hidden relative w-full">
      <div className=" mb-24"></div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm relative z-10">
        {/* Logo and About */}
        <motion.div
          className="ps-2 lg:ps-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            <span className="text-[#0d3b66]">Digital</span> Deta
          </h3>
          <p className="text-black leading-relaxed mb-6">
            Crafting smart digital experiences that transform businesses through
            design, innovation, and technology. Let's build the future together.
          </p>
          <p className="text-black text-sm">
            © {new Date().getFullYear()} Digital Deta. All Rights Reserved.
          </p>
        </motion.div>

        {/* Information */}
        <motion.div
          className="ps-2 lg:ps-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Information
          </h4>
          <ul className="space-y-3 text-black">
            <li>
              <Link
                to="/about"
                className="hover:text-indigo-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="hover:text-indigo-600 transition-colors"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                to="/career"
                className="hover:text-indigo-600 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-indigo-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="ps-2 lg:ps-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-black">
            <li>Digital Deta</li>
            <li>B-53, Janpath Sahid Nagar, Odisha</li>
            <li>
              <a
                href="mailto:info@digitaldeta.com"
                className="hover:text-indigo-600"
              >
                info@digitaldeta.com
              </a>
            </li>
            <li>
              <a href="tel:+918093633105" className="hover:text-indigo-600">
                +91 80936 33105, +91 78737 75777
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          className="ps-2 lg:ps-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Follow Us
          </h4>

          <div className="flex flex-col space-y-3">
            <motion.a
              href="https://www.facebook.com/digitaldeta/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#0d3b66] hover:text-white transition-all duration-300"
            >
              <FaFacebookF />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/digitaldeta/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#0d3b66] hover:text-white transition-all duration-300"
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/company/digitaldeta/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-[#0d3b66] hover:text-white transition-all duration-300"
            >
              <FaLinkedinIn />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Border */}
      <div className="mt-16 text-center text-black text-xs border-t border-gray-200 pt-6">
        Designed with 💙 by{" "}
        <span className="text-[#0d3b66] font-medium">Digital Deta</span>
      </div>
    </footer>
  );
}
