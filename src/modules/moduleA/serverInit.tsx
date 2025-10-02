// The role of this file is to initialize the module once mounted.

import {PriorityLevel} from "jopi-rewrite-ui";
import {ModuleInitContext_Server} from "jopi-rewrite";

export default function(modInit: ModuleInitContext_Server) {
    modInit.setModuleInfo({
        //moduleName: "jopi.moduleA",
        moduleTitle: "Module A"
    });

    modInit.addServerInitializer(PriorityLevel.Default, async () => {
        console.log('Module A - Server initialized (Default)');
    });
}