import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    if (!consent || consent === "rejected") {
      setShowBanner(true);
    } else if (consent === "accepted") {
      loadAnalyticsScripts();
    }
  }, []);

  // ✅ Load analytics only if accepted
  const loadAnalyticsScripts = () => {
    if (document.getElementById("google-analytics")) return;

    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // Replace with your Google ID
    script.async = true;
    script.id = "google-analytics";
    document.body.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", "G-XXXXXXXXXX");
    };
  };

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
    loadAnalyticsScripts();
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);

    // Show again after 5 minutes
    setTimeout(() => setShowBanner(true), 5 * 60 * 1000);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-5 left-5 bg-white text-gray-800 w-[320px] shadow-2xl rounded-xl px-5 py-5 flex flex-col gap-4 z-[100]"
        >
          <div className="text-sm leading-snug">
            🍪 We use cookies to enhance your browsing experience, serve
            personalised ads or content, and analyse our traffic. By clicking{" "}
            <strong>“Accept All”</strong>, you consent to our use of cookies.{" "}
            {/* <a
              href="/privacy-policy"
              className="text-[#0077b6] underline hover:text-[#023e8a]"
            >
              Learn more
            </a> */}
            .
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={handleReject}
              className="border border-gray-400 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-all"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="bg-[#0077b6] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#023e8a] transition-all shadow-sm"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
