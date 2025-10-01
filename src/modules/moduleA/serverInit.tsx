// The role of this file, is to initialize the module once mounted.

import {getModuleServerInitContent} from "jopi-rewrite";

const modInit = getModuleServerInitContent();

modInit.setModuleInfo({
    //moduleName: "jopi.moduleA",
    moduleTitle: "Module A"
});

console.log('Module A initialized');