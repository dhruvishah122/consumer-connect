import { SidebarProvider } from "@/components/ui/sidebar";
import {ChatSidebar}  from "../../node_modules/consumer-chat-service/client/src/pages/ChatSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import  {CustomerChat}  from "../../node_modules/consumer-chat-service/client/src/pages/CustomerChat";
import { Outlet } from "react-router-dom";
export default function Layout({ children }) {
  
  return (
    <SidebarProvider className="w-full h-[30%]">
           

      
      <Routes>
            
           <Route
          path="/customer/*"
          element={
            <div>
                <ChatSidebar />
             
                <Outlet /> 
                </div>
          }
        >
          <Route path=":chatID" element={<CustomerChat />} />
        </Route>
          </Routes> 
      {/* <main>
      
        <SidebarTrigger />
        {children}
      </main> */}
    </SidebarProvider>
  );
}
