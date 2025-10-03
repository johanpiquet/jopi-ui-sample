import * as React from "react"

import { NavMain } from "./nav-main.tsx"
import { NavProjects } from "./nav-projects.tsx"
import { NavUser } from "./nav-user.tsx"
import { TeamSwitcher } from "./team-switcher.tsx"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/shared/components/ui/sidebar"
import {useUserInfos} from "jopi-rewrite-ui";
import {useMenu} from "@/shared/stores/menuStore";
import {LogIn} from "lucide-react";
import { useNavigate } from "react-router"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const teamsMenu = useMenu(s => s.teamsMenu);
    const projectsMenu = useMenu(s => s.projectsMenu);
    const leftMenu = useMenu(s => s.leftMenu);
    const user = useUserInfos();
    const navigate = useNavigate();

    const onLoginClick = () => {
        const currentUrl = location.pathname + location.search;
        navigate(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={teamsMenu}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={leftMenu}/>
                <NavProjects projects={projectsMenu}/>
            </SidebarContent>
            <SidebarFooter>
                {user ?
                    <NavUser user={user}/> :
                    <div onClick={onLoginClick}
                         className="flex gap-4 justify-center cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-1">
                        <LogIn/>Log in
                    </div>
                }
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
