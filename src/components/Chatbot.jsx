import { useState, useEffect, useRef } from "react";
import styles from "../styles/chatbot.module.css";
import responses from "../data/botResponses.json";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your assistant. Ask me anything! Type 'help' to see what I can do." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    const chatWindow = messagesEndRef.current?.parentElement;
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    const lowerInput = input.toLowerCase();
    setInput("");

    setTimeout(() => {
      const botReply =
        responses[lowerInput] || "I'm not sure how to respond to that. Try typing 'help' to see what you can ask me!";
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: botReply }
      ]);
      setTyping(false);
    }, 1000);
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.from === "bot" ? styles.bot : styles.user}
          >
            {msg.from === "bot"
                ? msg.text.split("\n").map((line, i) => <div key={i}>{line}</div>)
                : msg.text}
          </div>
        ))}
        {typing && <div className={styles.typing}>Assistant is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
