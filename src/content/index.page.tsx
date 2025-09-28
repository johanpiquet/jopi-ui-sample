import {usePageTitle} from "jopi-rewrite-ui";
import React from "react";
import {Button} from "@/ui/button";

export default function() {
    usePageTitle("Home");

    return <div>
        <Button variant="outline">Click me</Button>
    </div>
}