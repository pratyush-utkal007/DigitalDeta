import React, { useState } from "react";
import ChatBot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { motion } from "framer-motion";
import botConfig from "./botConfig";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import { MessageCircle, X } from "lucide-react";

const ChatBotContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0d3b66] text-white p-4 rounded-full shadow-lg hover:bg-[#144b85] transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chatbot Window */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="mt-3 shadow-2xl rounded-xl overflow-hidden bg-red-600"
          style={{ width: "260px", maxWidth: "90vw" }}
        >
          <ChatBot
            config={botConfig}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ChatBotContainer;
