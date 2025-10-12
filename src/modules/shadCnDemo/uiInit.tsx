import {isBrowserSide, MenuName, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {nEvents} from "jopi-node-space";
import * as Person from "./schemas/person.ts";

import DefaultPageLayout from "./components/DefaultPageLayout.tsx";
import {AudioWaveform, Command, Frame, GalleryVerticalEnd, Map, PieChart, SquareTerminal} from "lucide-react";

if (isBrowserSide()) {
    nEvents.enableEventSpying((name, e) => {
        //console.log(`Event spy - ${name}`, e);
    });
}

function testSchema() {
    let p: Person.Type = {
        name: "John"
    };

    console.log("testSchema:", p);
}

export default function(modInit: ModuleInitContext_UI) {
    testSchema();

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

    menuManager.addMenuBuilder("favorites", (projectsMenu) => {
        projectsMenu.append({key: "Home", url: "/", icon: Frame});
    });

    menuManager.addMenuBuilder("teams", (teamsMenu) => {
        teamsMenu.append({key: "Acme 1", url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
        teamsMenu.append({key: "Acme 2", url: "#", icon: AudioWaveform, plan: "Plan 2"});
        teamsMenu.append({key: "Acme 3", url: "#", icon: Command, plan: "Plan 3"});
    });

    menuManager.addMenuBuilder(MenuName.LEFT_MENU, (leftMenu) => {
        leftMenu.append({
            key: "Features",
            icon: SquareTerminal,
            items: [
                {key: "Forms", url: "/features/forms"},
                {key: "Tests", url: "/features/tests"}
            ]
        });
    });

    nEvents.addListener("user.infosUpdated", () => {
        modInit.ifUserHasRoles(["admin", "writer"], () => {
            // alert("has the roles [\"admin\", \"writer\"]")
        })
    });
}