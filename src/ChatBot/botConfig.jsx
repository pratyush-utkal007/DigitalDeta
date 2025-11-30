import { createChatBotMessage } from "react-chatbot-kit";

const botName = "Digital Deta Assistant";

const botConfig = {
  botName,
  initialMessages: [
    createChatBotMessage(`👋 Hi there! I'm ${botName}.`),
    createChatBotMessage("May I know your full name?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#0d3b66", // Dark blue
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    },
    chatButton: {
      backgroundColor: "#0d3b66",
    },
  },
};

export default botConfig;
