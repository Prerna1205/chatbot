// Chatbot.js

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import image from "./Image 2.png";
import messageIcon from "./MessageIcon.png";
import notificationSound from "./notifications-sound-127856.mp3";
const Chatbot = () => {
  function markAsRead(id) {
    setMessages(messages.map((message) => {
      if (message.id === id) {
        return { ...message, isRead: true };
      }
      return message;
    }));
  }
  const [counter, setCounter] = useState(1);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const playSound = () => {
    const sound = new Audio(notificationSound);
    sound.play();
  };
  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    try {
      // Add the user's message to the chat history
      setMessages((prevState) => [
        ...prevState,
        { text: inputText, sender: "user" },
      ]);

      // Send the message to the backend
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${counter}`
      );

      const reply = response.data.body;
      console.log(response);
      playSound();
      // Add the bot's reply to the chat history
      setMessages((prevState) => [
        ...prevState,
        { text: reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Clear the input field
    setInputText("");
    setCounter((counter) => counter + 1);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <>
      <div className="chatbot-container">
        <center>
          <img src={image} alt="Chatbot Image" />
        </center>
        <center>
          <p>I am your customer support,ready to answer your questions.</p>
        </center>
        <div className="messages-container">
          {messages.map((message, index) => (
            <div className={`container-${message.sender}`}>
              <div key={index} className={`message ${message.sender} &&  ${!message.isRead && (message.sender==="bot")? 'unread' : ''}`} onClick={() => markAsRead(message.id)} >
                {message.text}
              </div>
              <div ref={messagesEndRef} />
            </div>
          ))}
        </div>
        <div className="input-container">
          <img src={messageIcon} alt="Message Icon" />

          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
