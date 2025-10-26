import cssModule from "./mymod.module.css";
import {useCssModule, usePageTitle} from "jopi-rewrite/ui";

export default function() {
    // Allow embedding our CSS module.
    useCssModule(cssModule);

    usePageTitle("Mon titre");

    return <>
        <div className={cssModule.myTestA}>Test CSS Module</div>
    </>
}