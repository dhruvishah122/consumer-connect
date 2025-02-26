
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { Tooltip, TooltipTrigger, TooltipContent,TooltipProvider} from "@/components/ui/tooltip";
 // Get chatID from URL
import {
  Card, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import ChatMessageList from "@/components/ui/chat-message-list";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ChatInput from "@/components/ui/chat-input";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns"; 
const socket = io("http://localhost:8080");
// import * as CryptoJS from "crypto-js";
import CryptoJS from 'crypto-js';
const secretKey = 'dhruvishah122';

export function CustomerChat() {
  const { chatID } = useParams(); // Extract chatID from URL
  const userType = "customer"; // Get chatID from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [customerEmail, setCustomerEmail] = useState(""); // Store customer email
  const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  };
  const decryptData = (cipherText) => {
      const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };
    const decryptArray = (array) => {
          return array.map(item => {
            try {
              if (!item.message || typeof item.message !== "string") {
                return item; // Return entire object without modification
              }
        
              const decrypted = CryptoJS.AES.decrypt(item.message, secretKey);
              const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        
              if (!plaintext) {
                return item; // Return original object if decryption fails
              }
        
              return { ...item, message: plaintext }; // Return full object with decrypted message
            } catch (error) {
              return item; // Return original object in case of error
            }
          });
        };
        
  useEffect(() => {
    if (!chatID) return;
    socket.emit("joinChat", { chatID, userType });
    fetch(`http://localhost:5173/customer/${chatID}`)
    .then(res => res.json())
    .then(data => setMessages(data.messages))
    .catch(err => console.error("Error fetching messages:", err));
    // Join the chat room
    // Listen for incoming messages
    socket.emit("requestChatHistory", { chatID });
    socket.on("chatHistory", (messages) => {
      const decryptedMessages = decryptArray(messages);
      setMessages([...decryptedMessages]);  // ✅ Set all messages from chat history
  });
    socket.on("receiveMessage", (message) => {
      // 🛑 Prevent duplicates
      const msg=decryptData(message.message);
      // console.log(msg);
      message.message=msg;
      setMessages((prev) => {
      //   if ("customer" === message.sender) {
      //     const prevMsg=decryptData(prev.message);
      //     prev.message=prevMsg;
      //     return prev; // Avoid duplicate messages
      // }
          return [...prev, message];
      });
  });
  return () => {
    socket.off("receiveMessage");
    socket.emit("leaveChat", { chatID, userType });
  };
}, [chatID]);
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatID,
      sender: userType, // Send as "branch"
      message: encryptData(newMessage),
      timestamp: new Date().toISOString(), // Auto-generate timestamp
    };

    socket.emit("sendMessage", messageData);
    // setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    
<Card className="w-[55%] ml-[10%] mt-[3%] h-[720px] overflow-auto">
      <CardHeader className="sticky top-0 left-0 z-10 bg-white dark:bg-gray-900 border-b-2 border-black pb-2 shadow-md">
        <div>
        <div className="flex flex-col">
          <div className="flex space-x-3 items-center w-full">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://static.vecteezy.com/system/resources/previews/010/872/716/original/3d-customer-service-icon-png.png" />
            </Avatar>
            <CardTitle className="text-left text-2xl">Dmart-Ahmedabad</CardTitle>
          </div>
          <CardDescription className="text-left">Customer Care</CardDescription>
        </div>
        </div>
      </CardHeader>

      <ChatMessageList>
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col gap-1">
          <ChatBubble key={index} variant={msg.sender === userType ? "sent" : "received"}>
            <ChatBubbleAvatar fallback={msg.sender === userType ? "CU" : "DM"} />
            <ChatBubbleMessage>{msg.message}</ChatBubbleMessage>
          </ChatBubble>
          <TooltipProvider>
          <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`text-xs text-gray-500 px-2 transition-opacity duration-300 cursor-pointer hover:opacity-80 ${
              msg.sender === userType ? "text-right" : "text-left"
            }`}
          >
            {msg.timestamp ? format(new Date(msg.timestamp), "hh:mm a") : ""}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          {msg.timestamp ? format(new Date(msg.timestamp), "PPPP hh:mm:ss a") : ""}
        </TooltipContent>
      </Tooltip>
      </TooltipProvider>
          </div>
         
        ))}
      </ChatMessageList>

      <CardFooter className="sticky bottom-0 left-0 z-10 bg-white dark:bg-gray-1000 p-3 border-t shadow-md flex gap-2">
  <ChatInput value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
  <Button className="bg-black text-white hover:bg-blue-500" onClick={sendMessage}>
    Send
  </Button>
</CardFooter>

    </Card>
  );
}

