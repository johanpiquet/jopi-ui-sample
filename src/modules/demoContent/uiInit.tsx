import {MenuName, ModuleInitContext_UI} from "jopi-rewrite-ui";
import {SquareTerminal} from "lucide-react";
import {EventPriority} from "jopi-node-space";

export default function(modInit: ModuleInitContext_UI) {
    modInit.addUiInitializer(EventPriority.Default, () => {
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