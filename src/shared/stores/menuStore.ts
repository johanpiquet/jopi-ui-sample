import { create } from 'zustand';
import {getLeftMenu, getMenu, type MenuItem} from "jopi-rewrite-ui";

interface MenuStore {
    leftMenu: MenuItem[],
    teamsMenu: MenuItem[],
    projectsMenu: MenuItem[],
}

export const useMenu = create<MenuStore>((set) => ({
    leftMenu: getLeftMenu(),
    teamsMenu: getMenu("teams"),
    projectsMenu: getMenu("projects"),
}))