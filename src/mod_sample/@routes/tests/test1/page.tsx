import "./cssTest1.css";
import Common from "./Common.tsx";
import {usePageTitle} from "jopi-rewrite/ui";

export default function() {
    usePageTitle("Mon titre");

    return <>
        <div className="myTestA">Test 1a</div>
        <div className="myTestB">Test 1b</div>
        <Common />
    </>
}