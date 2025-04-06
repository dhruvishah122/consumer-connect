import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom"; 
import { SidebarProvider } from "../components/ui/sidebar";
import SearchBar from "./search";
import { DoPost } from "./DoPost";
import { NotificationBell } from "./NotificationBell";
import { LogOut } from "lucide-react";
const Header = ({ className, fixed, children, ...props }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
    className={cn(
      "flex h-16 items-center bg-background px-6",
      fixed && "header-fixed peer/header fixed z-50 w-full rounded-md",
      offset > 10 && fixed ? "shadow" : "shadow-none",
      className
    )}
    {...props}
  >
    {/* Sidebar trigger + separator + navigation in one flex container */}
    <div className="flex items-center gap-4">
      {/* Sidebar trigger (optional) */}
      {/* <SidebarProvider><SidebarTrigger variant="outline" className="scale-125 sm:scale-100" /></SidebarProvider> */}
  
      {/* Vertical separator */}
      <div className="h-7 w-[1px] bg-gray-300"></div>
  
      {/* Navigation Links (right after the separator) */}
      <nav className="flex gap-6 text-lg font-medium">
  <Link to="/overview" className="text-gray-500 hover:text-black transition-colors">Home</Link>
  <Link to="/customers" className="text-gray-500 hover:text-black transition-colors">Explore posts</Link>
  <Link to="/products" className="text-gray-500 hover:text-black transition-colors">Brands</Link>
  <Link to="/settings" className="text-gray-500 hover:text-black transition-colors">Feedbacks</Link>
</nav>
</div>
<div className="flex justify-end">
  <DoPost />&nbsp;&nbsp;
  <NotificationBell className="h-[30px] w-[30px] mt-2"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <SearchBar className="mt-[-3px]"/>&nbsp;&nbsp;&nbsp;&nbsp;
 <button> <LogOut className="text-gray"/>Logout</button>
</div>
   
  
    {children}
  </header>
  
  
  );
};

export default Header;
