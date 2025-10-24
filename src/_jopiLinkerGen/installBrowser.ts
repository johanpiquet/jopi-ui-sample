
import {ModuleInitContext_UI} from "jopi-rewrite/ui";

export default function(registry: ModuleInitContext_UI) {
debugger;
    registry.addEventProvider("test.hello", async () => { const R = await import("@/events/test.hello"); return R.default; });
}

    