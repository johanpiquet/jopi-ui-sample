import * as React from "react"

import { NavMain } from "./nav-main.tsx"
import { NavProjects } from "./nav-projects.tsx"
import { NavUser } from "./nav-user.tsx"
import { TeamSwitcher } from "./team-switcher.tsx"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/shared/components/ui/sidebar"
import {useUserInfos} from "jopi-rewrite-ui";
import {useMenu} from "@/shared/stores/menuStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const teamsMenu = useMenu(s => s.teamsMenu);
  const projectsMenu = useMenu(s => s.projectsMenu);
  const leftMenu = useMenu(s => s.leftMenu);
  const user = useUserInfos();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teamsMenu} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={leftMenu} />
        <NavProjects projects={projectsMenu} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
