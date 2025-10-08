import {isBrowserSide, MenuName, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {nEvents} from "jopi-node-space";

import DefaultPageLayout from "./components/DefaultPageLayout.tsx";
import {AudioWaveform, Command, Frame, GalleryVerticalEnd, Map, PieChart} from "lucide-react";

if (isBrowserSide()) {
    nEvents.enableEventSpying((name, e) => {
        console.log(`Event spy - ${name}`, e);
    });
}

export default function(modInit: ModuleInitContext_UI) {
    modInit.setComponentAlias({alias: "page.layout.admin", component: DefaultPageLayout});

    const menuManager = modInit.getMenuManager();

    menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
        // The menu builders are called each time user roles are updated.
        // Which includes login/logout.
        //
        modInit.ifUserHasRoles(["admin"], () => {
            leftMenu.selectItem(["My roles", "Role Admin"]).value = {url: "/role/admin"};
        });

        modInit.ifUserHasRoles(["writer"], () => {
            leftMenu.selectItem(["My roles", "Role Writer"]).value = {url: "/role/writer"};
        });
    });

    menuManager.addMenuBuilder("projects", (projectsMenu) => {
        projectsMenu.append({key: "Design Engineering", url: "#", icon: Frame});
        projectsMenu.append({key: "Sales & Marketing", url: "#", icon: PieChart});
        projectsMenu.append({key: "Travel", url: "#", icon: Map});
    });

    menuManager.addMenuBuilder("teams", (teamsMenu) => {
        teamsMenu.append({key: "Acme 1", url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
        teamsMenu.append({key: "Acme 2", url: "#", icon: AudioWaveform, plan: "Plan 2"});
        teamsMenu.append({key: "Acme 3", url: "#", icon: Command, plan: "Plan 3"});
    });

    nEvents.addListener("user.infosUpdated", () => {
        modInit.ifUserHasRoles(["admin", "writer"], () => {
            // alert("has the roles [\"admin\", \"writer\"]")
        })
    });
}