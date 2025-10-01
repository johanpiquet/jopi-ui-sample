// The role of this file, is to initialize the module once mounted.

import {getModuleServerInitContent} from "jopi-rewrite";
import {PriorityLevel} from "jopi-rewrite-ui";

const modInit = getModuleServerInitContent();

modInit.setModuleInfo({
    //moduleName: "jopi.moduleA",
    moduleTitle: "Module A"
});

modInit.addInitializer(PriorityLevel.Default, async () => {
    console.log('Module A initialized (Default)');
});

modInit.addInitializer(PriorityLevel.Low, async () => {
    console.log('Module A initialized (Low)');
});

modInit.addInitializer(PriorityLevel.VeryLow, async () => {
    console.log('Module A initialized (VeryLow)');
});