import { motion } from "framer-motion";
import DynamicHeroSection from "../Componets/DynamicHeroSection";
import aboutservice from "../assets/aboutservice.jpg";
import aboutservice2 from "../assets/aboutservice2.jpg";
import aboutservice3 from "../assets/aboutservice3.jpg";
import aboutservice4 from "../assets/aboutservice4.jpg";
import aboutservice5 from "../assets/aboutservice5.jpg";
import aboutservice6 from "../assets/aboutservice6.jpg";

import aboutmission from "../assets/aboutmission.jpg";
import aboutvision from "../assets/aboutvision.jpg";
import aboutheader from "../assets/aboutheader.jpg";

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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Creative Ideas",
    description:
      "We develop fresh, innovative concepts that help brands stand out and connect with their target audience in meaningful ways.",
    img: aboutservice,
  },
  {
    title: "Digital Solutions",
    description:
      "Our team builds smart and scalable digital solutions designed to streamline operations, improve customer experience, and support long-term business growth.",
    img: aboutservice2,
  },
  {
    title: "Brand & Communication",
    description:
      "We help create a strong and consistent brand identity with clear communication that builds trust and resonates with your customers.",
    img: aboutservice3,
  },

  {
    title: "Digital Marketing",
    description:
      "We manage end-to-end digital marketing — SEO, social media, ads, and content — to help your business reach the right audience and grow faster.",
    img: aboutservice4,
  },

  {
    title: "Web & App Development",
    description:
      "Digital Deta builds fast, secure, and user-friendly websites and applications tailored to meet your business needs and create impactful digital experiences.",
    img: aboutservice5,
  },
  {
    title: "IT Consulting & Support",
    description:
      "We provide reliable IT consulting and ongoing support to help businesses make the right technology decisions and maintain smooth, uninterrupted operations.",
    img: aboutservice6,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};
export default function About() {
  const AnimatedHeading = ({ text }) => {
    const letters = text.split("");

    return (
      <motion.div
        className="flex flex-wrap justify-center text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1739]"
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
  const letterAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, type: "spring", stiffness: 120 },
    }),
  };

  const AnimatedTitle = ({ text }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex flex-wrap">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={char === " " ? "mr-2" : ""}
        >
          {char}
        </motion.span>
      ))}
    </h2>
  );

  return (
    <>
      <div className="overflow-x-hidden w-full">
        <DynamicHeroSection
          title="ABOUT"
          highlight="DIGITALDETA"
          description="At DigitalDeta, we are passionate about transforming your digital vision into reality. Our team provides innovative digital and business solutions that help brands grow and connect with their audience."
          bgImage={aboutheader}
          accentColor="#0d3b66"
        />

        {/* Section 1 */}
        <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 px-6 md:px-12 lg:px-20 overflow-x-hidden max-w-full">
          {/* Mission */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.img
                src={aboutmission}
                alt="Digital Deta Mission"
                className="w-full h-auto object-cover max-w-full"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-indigo-900/20"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-10 rounded-3xl shadow-lg"
            >
              <AnimatedTitle text="Our Mission" />

              <p className="text-gray-600 leading-relaxed mb-4">
                At{" "}
                <span className="font-semibold text-indigo-600">
                  Digital Deta
                </span>
                , our mission is to empower businesses through innovative
                digital transformation. We create scalable, user-centric, and
                impactful web solutions that enhance productivity and drive
                long-term growth.
              </p>

              <p className="text-gray-600 leading-relaxed">
                We blend technology, creativity, and strategy to deliver
                seamless digital experiences that help our clients stay ahead in
                an evolving marketplace.
              </p>
            </motion.div>
          </div>

          {/* Vision */}
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-10">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.img
                src={aboutvision}
                alt="Digital Deta Vision"
                className="w-full h-auto object-cover max-w-full"
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-indigo-900/20"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 bg-white p-10 rounded-3xl shadow-lg"
            >
              <AnimatedTitle text="Our Vision" />

              <p className="text-gray-600 leading-relaxed mb-4">
                Our vision is to be a global leader in crafting intelligent and
                sustainable digital ecosystems. We empower organizations to
                unlock their full potential through automation, innovation, and
                seamless technology integration.
              </p>

              <p className="text-gray-600 leading-relaxed">
                Through continuous learning, collaboration, and excellence, we
                aim to stand as a trusted partner in shaping the digital world
                of tomorrow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-gray-50 py-20 px-6 md:px-20 overflow-x-hidden max-w-full">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                <AnimatedTitle text="We Make Relationship Between" />
                <span className="text-[#0d3b66]"> Business </span>
                <span className="text-gray-900">&</span>
                <span className="text-[#0d3b66]"> Professionals</span>
              </h2>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-xl text-black">Since 2020</p>
                <div className="w-24 h-2 bg-black"></div>
              </div>

              <p className="text-black leading-relaxed mb-6">
                <strong className="text-[#0d3b66]">DigitalDeta</strong> always
                strives to deliver innovative business solutions that empower
                clients to grow efficiently and sustainably.
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden"
            >
              <div className="absolute -top-6 left-0 w-40 h-40 bg-[#00B4D8]/10 rounded-full blur-3xl overflow-hidden"></div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <motion.img
                  src="https://businex.jamstacktemplates.dev/static/media/about-2.3e593410.jpg"
                  alt="Our Team"
                  className="w-full h-auto object-cover max-w-full"
                  whileHover={{ scale: 1.03 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="relative text-black py-20 px-6 md:px-16 overflow-x-hidden max-w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <h4 className="uppercase tracking-widest text-[#0d3b66] font-bold mb-3">
              Our Services
            </h4>
            <p className="text-4xl md:text-4xl font-bold leading-tight">
              <AnimatedHeading text="We Make It Simple and Providing Best Solution" />
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-white"
              >
                <div className="overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-[#0a0f1c]/90 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 p-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </motion.div>

                <div className="py-4 bg-white text-center">
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        {/* <section className="flex flex-col md:flex-row bg-[#0b0d18] text-white overflow-x-hidden max-w-full">
          <div className="md:w-1/2 flex flex-col justify-center px-10 py-16">
            <motion.h4 className="uppercase text-sm text-[#b67433] mb-3">
              Digital Data Developers
            </motion.h4>

            <motion.h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              We build powerful digital experiences
            </motion.h2>

            <motion.p className="text-gray-400 max-w-lg">
              Our team of developers, designers, and analysts work together to
              craft seamless digital products.
            </motion.p>
          </div>

         
          <div className="md:w-1/2 grid grid-cols-2 gap-0 bg-gray-50">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="relative group overflow-hidden flex justify-center items-end"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-[400px] transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center text-center">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-300">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Section 5 */}
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
      </div>
    </>
  );
}
