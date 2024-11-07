import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to send message to backend and get chatbot response
  const sendMessage = async () => {
    console.log(userMessage);
    if (!userMessage.trim()) return; // Do nothing if input is empty

    setLoading(true); // Show loading spinner or some indication
    try {
      // Send message to your backend API
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage
      });

      // Set the response to the chatbot's answer
      setChatbotResponse(response.data.response);

      // Clear the user message after sending
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatbotResponse('Sorry, there was an error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        <div className="user-message">
          <strong>You:</strong> {userMessage}
        </div>
        <div className="chatbot-message">
          <strong>Chatbot:</strong> {chatbotResponse}
        </div>
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
