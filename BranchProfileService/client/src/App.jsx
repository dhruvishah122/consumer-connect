import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashSidebar from "./pages/DashSidebar";
import {SidebarProvider} from "./components/ui/sidebar";
import Header from "./pages/header";
import Post from "./pages/post";
import { CustomerChat } from "../node_modules/consumer-chat-service/client/src/pages/CustomerChat";
import Layout from "./pages/Layout";
import Chat from "./pages/chat";
import { ChatSidebar } from "../node_modules/consumer-chat-service/client/src/pages/ChatSidebar";

function App() {
  return (
    // <SidebarProvider className="ml-[400px">
       <DashSidebar />
      // <ChatSidebar className="[800px] flex items-center"/>
      // {/* // <Layout/> */}
      // {/* // <CustomerChat/> */}
      // {/* // <Post/> */}
      // </SidebarProvider>
    // <Header/>
  );
}

export default App;
