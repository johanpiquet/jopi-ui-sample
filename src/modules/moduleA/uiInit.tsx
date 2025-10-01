import {getModuleUiInitContext, PriorityLevel} from "jopi-rewrite-ui";

const modInit = getModuleUiInitContext();
alert("iici!");
modInit.addInitializer(PriorityLevel.Default, async () => {
    console.log('Module A - UI initialized (Default)');

    const rootMenu = modInit.getMenuManager().getLeftMenu();

    let menu = rootMenu.selectItem(["aa", "bb"]);
    menu.value = { title: "Menu entry" };

    console.log("menu:", JSON.stringify(rootMenu.value, null, 4));
});