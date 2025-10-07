import {isBrowserSide, MenuName, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, SquareTerminal} from "lucide-react";
import NodeSpace, {EventPriority} from "jopi-node-space";

import DefaultPageLayout from "./components/DefaultPageLayout.tsx";

const nEvents = NodeSpace.events;

if (isBrowserSide()) {
    NodeSpace.events.enableEventSpying((name, e) => {
        console.log(`Event ${name}`, e);
    });
}

export default function(modInit: ModuleInitContext_UI) {
    modInit.setComponentAlias({alias: "page.layout.admin", component: DefaultPageLayout});

    modInit.addUiInitializer(EventPriority.Default, () => {
        console.log('Module A - UI initialized (Default)');

        const menuManager = modInit.getMenuManager();

        //region LeftMenu

        menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
            // The menu builders are called each time user roles are updated.
            // Which includes login/logout.
            //
            modInit.ifUserHasRoles(["admin"], () => {
                leftMenu.selectItem(["My roles", "Role Admin"]).value = { url: "/role/admin" };
            });

            modInit.ifUserHasRoles(["writer"], () => {
                leftMenu.selectItem(["My roles", "Role Writer"]).value = { url: "/role/writer" };
            });

            leftMenu.append({
                key: "My roles",
                icon: SquareTerminal
            });

            leftMenu.append({
                key: "Tools",
                url: "/tools",
                icon: SquareTerminal,
                items: [
                    {
                        key: "tools",
                        url: "/tools"
                    }
                ]
            });

            leftMenu.append({
                key: "playground",
                url: "#",
                icon: SquareTerminal,
                items: [
                    {
                        key: "history",
                        url: "/history"
                    },
                    {
                        key: "starred",
                        url: "#",
                    },
                    {
                        key: "Settings",
                        url: "#",
                    },
                ],
            });

            leftMenu.append({
                key: "Models",
                url: "#",
                icon: Bot,
                items: [
                    {
                        key: "Genesis",
                        url: "#",
                    },
                    {
                        key: "Explorer",
                        url: "#",
                    },
                    {
                        key: "Quantum",
                        url: "#",
                    },
                ],
            })
        });

        //endregion

        //region Menu project

        menuManager.addMenuBuilder("projects", (projectsMenu) => {
            projectsMenu.append({key: "Design Engineering", url: "#", icon: Frame});
            projectsMenu.append({key: "Sales & Marketing", url: "#", icon: PieChart});
            projectsMenu.append({key: "Travel", url: "#", icon: Map});
        });

        //endregion

        //region Menu team

        menuManager.addMenuBuilder("teams", (teamsMenu) => {
            teamsMenu.append({key: "Acme 1", url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
            teamsMenu.append({key: "Acme 2", url: "#", icon: AudioWaveform, plan: "Plan 2"});
            teamsMenu.append({key: "Acme 3", url: "#", icon: Command, plan: "Plan 3"});
        });

        //endregion
    });

    nEvents.addListener("user.infosUpdated", () => {
        modInit.ifUserHasRoles(["admin", "writer"], () => {
           // alert("has the roles [\"admin\", \"writer\"]")
        })
    });
}