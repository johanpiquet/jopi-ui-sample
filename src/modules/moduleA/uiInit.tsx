import {PriorityLevel, ModuleInitContext_UI} from "jopi-rewrite-ui";

export default function(modInit: ModuleInitContext_UI) {
    modInit.addUiInitializer(PriorityLevel.Default, async () => {
        console.log('Module A - UI initialized (Default)');

        const rootMenu = modInit.getMenuManager().getLeftMenu();

        let menu = rootMenu.selectItem(["aa", "bb"]);
        menu.value = { title: "Menu entry" };

        console.log("menu:", JSON.stringify(rootMenu.value, null, 4));
    });
}