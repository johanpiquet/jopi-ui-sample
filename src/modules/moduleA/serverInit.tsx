// The role of this file is to initialize the module once mounted.

import {getModuleServerInitContext} from "jopi-rewrite";
import {PriorityLevel} from "jopi-rewrite-ui";

const modInit = getModuleServerInitContext();

modInit.setModuleInfo({
    //moduleName: "jopi.moduleA",
    moduleTitle: "Module A"
});

modInit.addInitializer(PriorityLevel.Default, async () => {
    console.log('Module A - Server initialized (Default)');
});