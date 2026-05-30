// import { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";
// import "./App.css";



// function App() {
  
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [username, setUsername] = useState("");

//   const socketRef = useRef(null);

//   useEffect(() => {
//   console.log("Socket URL:", import.meta.env.VITE_SOCKET_URL);

//   socketRef.current = io(import.meta.env.VITE_SOCKET_URL);

//   socketRef.current.on("connect", () => {
//     console.log("Connected:", socketRef.current.id);
//   });

//   socketRef.current.on("connect_error", (err) => {
//     console.log("Connect Error:", err.message);
//   });

//   return () => {
//     socketRef.current.disconnect();
//   };
// }, []);

//   const sendMessage = () => {
//     if (!message.trim() || !username.trim()) return;

//     socketRef.current.emit("send_message", {
//       username,
//       message,
//     });

//     setMessage("");
//   };

//   return (
//     <div className="chat-wrapper">
//       <div className="chat-header">💬 BiteX Chat Application</div>

//       <div className="chat-body">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`message ${
//               msg.username === username ? "right" : "left"
//             }`}
//           >
//             <b>{msg.username}</b> {msg.message}
//           </div>
//         ))}
//       </div>

//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />

//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default App;





import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("receive_message", (data) => {
      console.log("Message received:", data);

      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (!username.trim() || !message.trim()) return;

    socket.emit("send_message", {
      username,
      message,
    });

    setMessage("");
  };

  return (
  <div className="chat-container">
    <div className="chat-card">
      <div className="chat-header">
        💬 BiteX Chat
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <span className="username">{msg.username}</span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="chat-inputs">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="message-row">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default App;