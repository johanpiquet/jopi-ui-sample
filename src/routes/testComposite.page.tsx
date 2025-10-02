import {Composite, usePageTitle} from "jopi-rewrite-ui";
import React from "react";
import {Button} from "@/shared/components/ui/button";

export default function() {
    usePageTitle("Home");

    return <>
        <Button variant="outline">Click me</Button>
        <Composite name="admin.dashBoardPage.body" />
    </>
}