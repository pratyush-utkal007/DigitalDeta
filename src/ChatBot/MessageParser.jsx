import React from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const text = message.trim();
    if (!text) return;

    const { userData } = actions;

    // Step 1: Ask for Name
    if (!userData?.name) {
      actions.handleName(text);
      return;
    }

    // Step 2: Ask for Email (with validation)
    if (!userData?.email) {
      if (!emailRegex.test(text)) {
        actions.handleBotMessage("❌ Please enter a valid email address.");
        return;
      }
      actions.handleEmail(text);
      return;
    }

    // Step 3: Ask for Phone (with validation)
    if (!userData?.phone) {
      if (!phoneRegex.test(text)) {
        actions.handleBotMessage(
          "📞 Please enter a valid 10-digit phone number."
        );
        return;
      }
      actions.handlePhone(text);
      return;
    }

    // Step 4: Ask for Service
    if (!userData?.service) {
      actions.handleService(text);
      return;
    }

    // Step 5: If all collected
    actions.handleBotMessage(
      "✅ Thanks for providing your details! Our team will reach out shortly."
    );
  };

  // Pass parser and actions to child components
  return React.Children.map(children, (child) =>
    React.cloneElement(child, { parse, actions })
  );
};

export default MessageParser;
