
import {ModuleInitContext_UI} from "jopi-rewrite/ui";
import modUiInit1 from "../mod_sample/uiInit.tsx";
export default function(registry: ModuleInitContext_UI) {
    registry.addEventProvider("test.hello", async () => { const R = await import("@/events/test.hello"); return R.default; });
// @ts-ignore
modUiInit1(registry);
}
    