"use client";

import React, { useEffect } from "react";

const Chatbot: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.defer = true;
    script.setAttribute("chatbotId", "xIeFuqnG5pl_ylMitXOGK");
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default Chatbot;
