import {MenuName, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {SquareTerminal} from "lucide-react";
import {EventPriority} from "jopi-node-space";
import DefaultPageLayout from "./components/defaultPageLayout.tsx";

export default function(modInit: ModuleInitContext_UI) {
    modInit.addUiInitializer(EventPriority.Default, () => {
        modInit.setComponentAlias({alias: "page.layout.admin", component: DefaultPageLayout});

        const menuManager = modInit.getMenuManager();

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
    });
}