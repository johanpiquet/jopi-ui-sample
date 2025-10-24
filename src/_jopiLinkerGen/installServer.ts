
import {globalRegistry} from "jopi-toolkit/jk_registry";
import modServerInit1 from "../mod_sample/serverInit.tsx";
export default function() {
const registry = globalRegistry;

// @ts-ignore
modServerInit1(registry);
}
    