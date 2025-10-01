// The role of this file is to initialize the module once mounted.

import {getModuleServerInitContext} from "jopi-rewrite";
import {PriorityLevel} from "jopi-rewrite-ui";

const modInit = getModuleServerInitContext();

modInit.setModuleInfo({
    //moduleName: "jopi.moduleA",
    moduleTitle: "Module A"
});

modInit.addInitializer(PriorityLevel.Default, async () => {
    console.log('Module A initialized (Default)');

    const rootMenu = modInit.getMenuManager().getLeftMenu();

    let menu = rootMenu.selectItem(["aa", "bb"]);
    menu.value = { title: "Menu entry" };

    console.log("menu:", JSON.stringify(rootMenu.value, null, 4));
});