// import { SidebarProvider } from "@/components/ui/sidebar";
// import {ChatSidebar}  from "../../../../Chat service/client/src/pages/ChatSidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import  {CustomerChat}  from "../../../../Chat service/client/src/pages/CustomerChat";
// import { Outlet } from "react-router-dom";
// export default function Layout({ children }) {
  
//   return (
//     <SidebarProvider className="w-full h-[30%]">
           

      
//       <Routes>
            
//            <Route
//           path=":email/customer/*"
//           element={
//             <div>
//                 <ChatSidebar />
             
//                 <Outlet /> 
//                 </div>
//           }
//         >
//           <Route path=":chatID" element={<CustomerChat />}  className="flex mt-8  items-center  w-[70%]   "  />
//         </Route>
//           </Routes> 
//       {/* <main>
      
//         <SidebarTrigger />
//         {children}
//       </main> */}
//     </SidebarProvider>
//   );
// }
import { SidebarProvider } from "@/components/ui/sidebar";
import {ChatSidebar}  from "../../../../Chat service/client/src/pages/ChatSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import  {CustomerChat}  from "../../../../Chat service/client/src/pages/CustomerChat";
import { Outlet } from "react-router-dom";
import {NotificationBell} from "./NotificationBell"
import { CompanyProfileWebsite } from "./feedbacks";
export default function Layout({ children }) {
  
  return (
    <SidebarProvider className="w-full h-[25%]  ml-[20%] ">
           

      
      <Routes>
           {/* <Route path=":email/*" element={<NotificationBell />} /> */}
           <Route
          path=":email/customer/*"
          element={
            <div className=" relative w-[700px] min-h-screen">
                <ChatSidebar className="absolute  left-[70%] " />
             
                <Outlet /> 
                </div>
          }
        >
          <Route path=":chatID" element={<CustomerChat />}  className="  items-center flex  w-full  "  />
        </Route>
        <Route path=":email/feedbacks" element={<CompanyProfileWebsite className="  items-center flex  w-full  " /> } />
          </Routes> 
      {/* <main>
      
        <SidebarTrigger />
        {children}
      </main> */}
    </SidebarProvider>
  );
}
