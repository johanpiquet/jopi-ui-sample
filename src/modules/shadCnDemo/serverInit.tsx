// The role of this file is to initialize the module once mounted.

import {ModuleInitContext_Server} from "jopi-rewrite";
import {EventPriority} from "jopi-node-space/ns_events";

export default function(modInit: ModuleInitContext_Server) {
    modInit.setModuleInfo({
        //moduleName: "jopi.moduleA",
        moduleTitle: "Module A"
    });

    modInit.addServerInitializer(EventPriority.Default, async () => {
        console.log('Module A - Server initialized (Default)');
    });
}