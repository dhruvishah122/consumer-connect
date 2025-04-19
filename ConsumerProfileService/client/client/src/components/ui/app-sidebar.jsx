"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,Headset ,
  Frame,User ,
  GalleryVerticalEnd,Handshake,
  Map,
  PieChart,
  Settings2,
  LayoutDashboard,MessagesSquare,Newspaper,ListChecks   
} from "lucide-react";

import {NavProjects1} from "@/components/ui/nav-projects1";
 import { NavProjects } from "@/components/ui/nav-projects";
import { NavUser } from "@/components/ui/nav-user";
import { TeamSwitcher } from "@/components/ui/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/avatar.png",
  },
  teams: [
    {
      name: "Consumer connect",
      logo: Handshake,
      plan: "Customer",
    }
  ],
  userEdit: [
    {
        name: "Edit profile",
        url: "#",
        icon: User,
        
      },
    { name: "Contact support", url: "#", icon: Headset  },
   
  ],
  projects: [
    {
        name: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        
      },
    { name: "Chats", url: "/customer", icon: MessagesSquare },
    { name: "Posts", url: "/post", icon: Newspaper  },
    { name: "Status", url: "#", icon: ListChecks   },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.userEdit} />
        <NavProjects1 projects={data.projects} />

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
