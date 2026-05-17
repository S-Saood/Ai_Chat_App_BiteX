const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


const app = express();
app.use(cors());

const server = http.createServer(app);




// we are creating a  socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app
    methods: ["GET", "POST"],
  },
});




// when user connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // receive message from client
  socket.on("send_message", (data) => {
    console.log("Message:", data)
    // send message to ALL users 
    io.emit("receive_message", {
      username: data.username,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


app.get("/", (req, res)=>{
  console.log("root route hit")
  res.send("server is running")
})



// start the server 3000
server.listen(3001, () => {
  console.log("Server running on port 3001");
});