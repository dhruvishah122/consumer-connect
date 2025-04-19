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
import { useParams } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// // Sample data
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "/assets/avatar.png",
//   },
//   teams: [
//     {
//       name: "Consumer connect",
//       logo: Handshake,
//       plan: "Customer",
//     }
//   ],
//   userEdit: [
//     {
//         name: "Edit profile",
//         url: "#",
//         icon: User,
        
//       },
//     { name: "Contact support", url: "#", icon: Headset  },
   
//   ],
//   projects: [
//     {
//         name: "Dashboard",
//         url: "#",
//         icon: LayoutDashboard,
        
//       },
//     { name: "Chats", url:`/${email}/customer`, icon: MessagesSquare },
//     { name: "Posts", url: "/post", icon: Newspaper  },
//     { name: "Status", url: "#", icon: ListChecks   },
//   ],
// };

// export function AppSidebar(props) {
//   const { email } = useParams();
// console.log(email);
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavProjects projects={data.userEdit} />
//         <NavProjects1 projects={data.projects} />

//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }
export function AppSidebar(props) {
  const email = window.location.pathname.slice(1);
  console.log(email);
  console.log("Email from URL:", email);

  const projects = [
    {
      name: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      name: "Chats",
      url: `/${email}/customer`,
      icon: MessagesSquare,
    },
    {
      name: "Raise complaint",
      url: `http://localhost:5175/${email}/post`,
      icon: Newspaper,
    },
    {
      name: "My Posts",
      url: `http://localhost:5175/${email}/postList`,
      icon: Newspaper,
    },
    {
      name: "Status",
      url: `http://localhost:5175/${email}/status`,
      icon: ListChecks,
    },
    {
      name: "Review brand",
      url: `http://localhost:5175/${email}/review`,
      icon: ListChecks,
    }
  ];

  const userEdit = [
    {
      name: "Edit profile",
      url: "#",
      icon: User,
    },
    {
      name: "Contact support",
      url: "#",
      icon: Headset,
    },
  ];

  const teams = [
    {
      name: "Consumer connect",
      logo: Handshake,
      plan: "Customer",
    },
  ];

  const user = {
    name: "shadcn",
    email: email,
    avatar: "/assets/avatar.png",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={userEdit} />
        <NavProjects1 projects={projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
