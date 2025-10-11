import {ModuleInitContext_Server} from "jopi-rewrite";
import {jopiApp} from "jopi-rewrite";

export default function(modInit: ModuleInitContext_Server) {
    modInit.setModuleInfo({
        moduleTitle: "Prime React Demo"
    });

    // Disable Tailwind
    //jopiApp.globalConfig().configure_tailwindProcessor().disableTailwind();
}