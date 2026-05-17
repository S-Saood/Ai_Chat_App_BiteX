import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("https://ai-chat-app-bitex.onrender.com");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = () => {
    if (!message.trim() || !username.trim()) return;

    socket.emit("send_message", {
      username: username,
      message: message,
    });
    setMessage("");
    setUsername("")
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">💬 BiteX Chat Application </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className="message right">
            <b id="name">{msg.username} </b>
            {msg.message}
          </div>
        ))}
      </div>

      <div className="chat-footer">
        
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
