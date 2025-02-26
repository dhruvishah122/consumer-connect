import { useEffect, useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // ShadCN's utility function for dynamic classes
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

// Static menu items.
const defaultItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function ChatSidebar() {
  const [branchItems, setBranchItems] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:8080/chat/m@gmail.com");
        const data = await response.json();

        if (Array.isArray(data)) {
          setBranchItems(
            data.map((branch) => ({
              title: branch.BranchName,
              url: `/customer/${branch._id}`,
              icon: Inbox, // Change icon if needed
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <Sidebar className="w-[380px] bg-gray-100 dark:bg-gray-900 mt-[3%]">
      <SidebarContent>
        {/* Dmart Section */}
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-6 ml-4">Complaint chats</h2>

        {/* Chat Branches (Dynamically Fetched) */}
        {branchItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-l font-semibold text-gray-600 dark:text-gray-300 mt-4 ml-2">
              Chat Branches
            </SidebarGroupLabel>
            <SidebarMenu className="mt-2">
              {branchItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "hover:bg-blue-500 hover:text-white hover:scale-105"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-base">{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
