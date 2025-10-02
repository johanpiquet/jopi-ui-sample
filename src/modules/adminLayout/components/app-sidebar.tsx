"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main.tsx"
import { NavProjects } from "./nav-projects.tsx"
import { NavUser } from "./nav-user.tsx"
import { TeamSwitcher } from "./team-switcher.tsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"
import {getLeftMenu, getMenu, useUserInfos} from "jopi-rewrite-ui";

function getData() {
  let user = useUserInfos();

  return {
    user: {
      name: user?.name || "(not connected)",
      email: user?.email || "(no mail)",
    },
    teams: getMenu("teams"),
    navMain: getLeftMenu(),
    projects: getMenu("projects"),
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = getData();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
