import React from "react";
import { motion } from "framer-motion";

export default function DynamicHeroSection({
  title,
  highlight,
  description,
  bgImage,
  accentColor = "#00B4D8",
}) {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating Overlay Animation */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-black bg-opacity-60"
      ></motion.div>

      {/* Animated Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 px-6 md:px-12 max-w-3xl"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
          {title} <span style={{ color: accentColor }}>{highlight}</span>
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-200">
          {description}
        </p>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          className="mx-auto mt-8 w-24 h-[3px] origin-left"
          style={{ backgroundColor: accentColor }}
        ></motion.div>
      </motion.div>
    </section>
  );
}
