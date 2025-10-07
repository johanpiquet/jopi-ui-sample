import * as React from "react"

import { NavMain } from "./nav-main.tsx"
import { NavProjects } from "./nav-projects.tsx"
import { NavUser } from "./nav-user.tsx"
import { TeamSwitcher } from "./team-switcher.tsx"
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail,} from "@/shared/components/ui/sidebar"
import {type MenuItem, MenuName, useMenu, useUserInfos} from "jopi-rewrite-ui";
import {LogIn} from "lucide-react";
import { useNavigate } from "react-router"
import {nEvents} from "jopi-node-space";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const teamsMenu = useMenu("teams");
    const projectsMenu = useMenu("projects");
    const leftMenu = useMenu(MenuName.LEFT_MENU);
    console.log("useMenu leftMenu", leftMenu);

    const user = useUserInfos();
    const navigate = useNavigate();

    const onLoginClick = () => {
        const currentUrl = location.pathname + location.search;
        navigate(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
    };

    const handleLinkClick = (menuItem: MenuItem, menuName: string) => {
        nEvents.sendEvent("app.menu.click", {menuName, menuItem});
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={teamsMenu}/>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={leftMenu} onClick={(item) => handleLinkClick(item, MenuName.LEFT_MENU)}/>
                <NavProjects projects={projectsMenu}/>
            </SidebarContent>
            <SidebarFooter>
                {user ?
                    <NavUser user={user} /> :
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
