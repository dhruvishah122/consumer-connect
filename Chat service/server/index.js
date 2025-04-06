const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const {Server}  = require("socket.io");
const cors = require("cors");
// const { redirect } = require("server/reply");

const app = express();
const PORT = 8080;
app.use(cors({
    origin: "*",  // ✅ Allow all origins (change to specific origin if needed)
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true // ✅ Allow cookies/auth headers if needed
}));

// ✅ Handle preflight OPTIONS requests
app.options("*", cors());

// const corsOptions = {
//     origin: "*", // ✅ Allow requests from any origin
//     methods: ["GET", "POST", "PUT",  "DELETE", "OPTIONS"], // ✅ Allow all methods
//     allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow specific headers
//     credentials: true // ✅ Allow cookies and authentication headers
//   };
  
//   app.use(cors(corsOptions)); 
// app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from frontend

  app.use(express.json());

const server = http.createServer(app);
const io = new Server(server);
const ChatSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    BranchName: String,
    BranchID: String,
    CustomerEmail: String,
    CustomerName: String,
    Status: String,
    Messages: [
      {
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
      }
    ]
}, { collection: "Chat" });

const Chat = mongoose.model("Chat", ChatSchema);
mongoose.connect("mongodb+srv://maahivaghela05:Ma82810La@consumer-connect.bvrrf.mongodb.net/ChatService", 
).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

  
  io.on("connection", (socket) => {
      socket.on("joinChat", ({ chatID, userType, userID }) => {
    socket.join(chatID);
    console.log(`${userType} (${userID}) joined room: ${chatID}`);
  });
  socket.on("requestChatHistory", async ({ chatID }) => {
    try {
        const chat = await Chat.findById(chatID);
        if (chat) {
            socket.emit("chatHistory", chat.Messages);
        } else {
            socket.emit("chatHistory", []); // Send empty array if no chat found
        }
    } catch (error) {
        console.error("Error fetching chat history:", error);
        socket.emit("chatHistory", []);
    }
});


  socket.on("sendMessage", async (data) => {
    const { chatID, sender, message } = data;
    console.log(message);
    io.to(chatID).emit("receiveMessage", { sender, message, timestamp: new Date().toISOString() });

    // Save message to MongoDB (Assuming you have a Chat model)
    await Chat.findByIdAndUpdate(chatID, { $push: { Messages: { sender, message } } });
  });

  socket.on("leaveChat", ({ chatID, userType, userID }) => {
    socket.leave(chatID);
    console.log(`${userType} (${userID}) left room: ${chatID}`);
  });
    socket.on("startChatRequest",  async({ customerEmail, branchID }) => {
        try {
            console.log("new ans",socket.id);
            let chat = new Chat({
                _id: socket.id,
                BranchName: "Dmart",
                BranchID: branchID,
                CustomerName: customerEmail.split("@")[0],
                CustomerEmail: customerEmail,
                Status: "Active",
                Messages: []
            });

            await chat.save();
            console.log("New chat created:", chat);

            // Emit redirect event
            io.emit("redirect", `http://localhost:5173/branch/${chat._id}`);
        } catch (err) {
            console.error("Error creating chat:", err);
            io.emit("error", "Chat creation failed");
        }
    });

    socket.on("user", async (messageData) => {
        console.log(`New message in chat ${messageData.chatID}:`, messageData);

        try {
            // Find the chat document and update it by pushing the new message
            const chat = await Chat.findById(messageData.chatID);
            
            if (!chat) {
                console.log("Chat not found:", messageData.chatID);
                return;
            }

            // Push new message into the Messages array
            chat.Messages.push({
                sender: messageData.sender,
                message: messageData.message,
                timestamp: messageData.timestamp
            });

            // Save updated chat document
            await chat.save();

            console.log("Message saved in DB:", messageData);

            // Broadcast message to the chat room
            io.to(messageData.chatID).emit("receiveMessage", messageData);
        } catch (error) {
            console.error("Error saving message to DB:", error);
        }
    });

  
});

  
  app.get("/chat/:email/:branchID", async (req, res) => {
    const customerEmail = req.params.email;
    const {branchID} = req.params;
    let chat = await Chat.findOne({ 
         CustomerEmail:customerEmail,
         BranchID:branchID
    });
     console.log(chat);
    try {
       
        if (chat) {
           
            // ✅ Chat exists → Redirect to existing chat
            return res.json({ redirectUrl:`http://localhost:5173/branch/${chat._id}`});
            // return res.redirect(`http://localhost:5173/branch/${chat._id}`);
        } else {
            // ✅ No chat exists → Start WebSocket Connection
            console.log("hello");
          //  io.emit("startChatRequest", { customerEmail, branchID });
            res.json({ startSocket: true, customerEmail, branchID });
        }
    } catch (error) {
        console.error("Error checking/creating chat:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

 app.get("/chat/:email",async(req,res)=>{
    const customerEmail=req.params.email;
    try {
        const branches = await Chat.find({ CustomerEmail: customerEmail });
        // console.log(branches);
    if (!branches.length) {
        return res.status(404).json({ message: "No chats found for this customer." });
      }
  
      res.json(branches);
    } catch (error) {
      console.error("Error fetching customer chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
 })
 app.get("/Branchchat/:id",async(req,res)=>{
    const branchID=req.params.id;
    try {
        const customers = await Chat.find({ BranchID:branchID });
        //  console.log(branchID);
    if (!customers.length) {
        return res.status(404).json({ message: "No chats found for this customer." });
      }
  
      res.json(customers);
    } catch (error) {
      console.error("Error fetching customer chats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
 })
  server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});