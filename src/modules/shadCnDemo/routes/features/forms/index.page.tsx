import React from "react";
import {AdminPageLayout} from "jopi-rewrite-ui";
import { Button } from "@/shared/components/ui/button";

//TODO: replace by an automatique discover mechanism.
import "./myVariants.tsx";

import {CheckboxFormField, InputFormField, JForm} from "jopi-rewrite/uikit";
import * as ns_schema from "jopi-node-space/ns_schema";

function PageContent() {
    const formSchema = ns_schema.schema({
        login: ns_schema.string("Login", {default: "My super login"}),

        password: ns_schema.string("Password", {
            minLength: 3,
            errorMessage_isRequired: "Password is required",
            errorMessage_theValueIsInvalid: "Password must be at least 3 characters long",
            errorMessage_minLength: "Trop petit"
        })
    });

    // TODO
    let isSending = false;

    return <>
        <div className="w-full flex flex-col items-center justify-center mt-20 relative">

            <h2 className="text-4xl text-gray-900 font-medium">Register</h2>

            <div className="mb-20"></div>

            <JForm schema={formSchema} className="space-y-8">
                    <InputFormField name="login" title="Login"/>

                    <InputFormField name="password" title="Password" placeholder="MyP@ssword"/>

                    <CheckboxFormField name="acceptConditions" title="Register to newsletter"
                                       description="By checking this box, you agree to our privacy policy and terms of use."/>

                    { isSending ? undefined : <Button type="submit">Submit</Button> }

            </JForm>
        </div>
    </>
}

export default function() {
    return <AdminPageLayout>
        <PageContent />
    </AdminPageLayout>
}