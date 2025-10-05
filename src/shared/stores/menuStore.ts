import { create } from 'zustand';
import {getLeftMenu, getMenu, type MenuItem} from "jopi-rewrite-ui";
import NodeSpace from "jopi-node-space";

interface MenuStore {
    leftMenu: MenuItem[],
    teamsMenu: MenuItem[],
    projectsMenu: MenuItem[],
}

function createStoreState() {
    return {
        leftMenu: getLeftMenu(),
        teamsMenu: getMenu("teams"),
        projectsMenu: getMenu("projects"),
    };
}

export const useMenu = create<MenuStore>(() => createStoreState());

// Allow updating the store if a menu changes.
// This will refresh the screens.
NodeSpace.events.addListener("app.menu.invalided", async () => {
    debugger;
    useMenu.setState(createStoreState());
});