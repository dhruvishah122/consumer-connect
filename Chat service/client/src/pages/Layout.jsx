import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "./ChatSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CustomerChat } from "./CustomerChat";
import { BranchChat } from "./BranchChat";
import { ChatSidebarBranch } from "./ChatSidebarBranch";
export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <Router>
      <Routes>
            <Route path="/customer/:chatID" element={<CustomerChat />} />
            {/* Add other routes here */}
            <Route path="/branch/:chatID" element={<BranchChat />} />
            {/* Add other routes here */}
          </Routes>
          </Router>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
