import cssModule from "./mystyle.module.css";
import {useCssModule} from "jopi-rewrite/ui";

export default function() {
    // Allow embedding our CSS module.
    useCssModule(cssModule);

    return <>
        <div className={cssModule.myButton}>
            <div className={cssModule.myText}>Test CSS Module</div>
        </div>
    </>
}