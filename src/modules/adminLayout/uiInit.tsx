import {PriorityLevel, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {AudioWaveform, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, SquareTerminal} from "lucide-react";

export default function(modInit: ModuleInitContext_UI) {
    modInit.addUiInitializer(PriorityLevel.Default, async () => {
        console.log('Module A - UI initialized (Default)');

        //region LeftMenu

        const leftMenu = modInit.getMenuManager().getLeftMenu();

        leftMenu.append({
                key: "playground",
                title: "Playground",
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        key: "history",
                        url: "#",
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

        //endregion

        //region Menu project

        const projectsMenu = modInit.getMenuManager().getMenu("projects");

        projectsMenu.append({key: "Design Engineering", url: "#", icon: Frame});
        projectsMenu.append({key: "Sales & Marketing", url: "#", icon: PieChart});
        projectsMenu.append({key: "Travel", url: "#", icon: Map});

        //endregion

        //region Menu team

        const teamsMenu = modInit.getMenuManager().getMenu("teams");
        teamsMenu.append({key: "Acme 1", url: "#", icon: GalleryVerticalEnd, plan: "Plan 1"});
        teamsMenu.append({key: "Acme 2", url: "#", icon: AudioWaveform, plan: "Plan 2"});
        teamsMenu.append({key: "Acme 3", url: "#", icon: Command, plan: "Plan 3"});

        //endregion
    });
}