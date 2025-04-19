"use client";

import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects1(props) {
  const { projects } = props;
  const { isMobile } = useSidebar();

  // Base URL to remove from all links
  const BASE_URL = "http://localhost:5175";

  // Function to strip the base URL and get clean path
  const getCleanPath = (url) => {
    if (!url) return "/";
    
    // Simple string replacement to remove the base URL
    if (url.startsWith(BASE_URL)) {
      return url.replace(BASE_URL, "");
    }
    
    // If it already looks like a path (starts with /)
    if (url.startsWith("/")) {
      return url;
    }
    
    // Default case, add leading slash if needed
    return `/${url}`;
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-xl">Menu</SidebarGroupLabel>
      <br></br>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild className="size-24">
              <Link 
                to={getCleanPath(item.url)} 
                className="text-black-500 hover:text-black transition-colors"
              >
                <item.icon /> 
                <span className="text-lg p-3">{item.name}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}