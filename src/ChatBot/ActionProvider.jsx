import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

let userData = {
  name: "",
  email: "",
  phone: "",
  service: "",
};

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const updateState = (message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  const handleBotMessage = (text) => {
    const botMessage = createChatBotMessage(text);
    updateState(botMessage);
  };

  // ---- Conversation Flow ----
  const handleName = (name) => {
    userData.name = name.trim();
    handleBotMessage(`Nice to meet you, ${name}! What's your email address?`);
  };

  const handleEmail = (email) => {
    userData.email = email.trim();
    handleBotMessage(`Thanks, ${userData.name}. What's your phone number?`);
  };

  const handlePhone = (phone) => {
    userData.phone = phone.trim();
    handleBotMessage(
      `Got it, ${userData.name}. Which service are you interested in?`
    );
  };

  const handleService = async (service) => {
    userData.service = service.trim();

    handleBotMessage(`Perfect! Submitting your details...`);

    // ---- Plain text email body with icons ----
    const messageText = `
💬 New Lead from Digital Deta Assistant

👤 Name: ${userData.name}
📧 Email: ${userData.email}
📞 Phone: ${userData.phone}
💼 Service Interested In: ${userData.service}

------------------------------------
Submitted via Digital Deta Website Chat Assistant
    `;

    // ---- Submit to Web3Forms ----
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "6d8ecf3c-064c-4e2e-afa0-e7c9ae638bdb",
          subject: `💼 New Chat Lead from ${userData.name}`,
          from_name: "Digital Deta Website",
          message: messageText, // plain text email
        }),
      });

      handleBotMessage(
        "Your details have been submitted successfully 🎉! Our team will contact you soon."
      );
    } catch (err) {
      handleBotMessage(
        "Oops! Something went wrong while submitting. Please try again later."
      );
    }
  };

  // ---- Return Children with Actions ----
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          actions: {
            handleName,
            handleEmail,
            handlePhone,
            handleService,
            handleBotMessage,
            userData,
          },
        })
      )}
    </div>
  );
};

export default ActionProvider;
