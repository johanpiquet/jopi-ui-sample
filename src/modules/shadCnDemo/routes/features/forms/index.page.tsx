import React from "react";
import {AdminPageLayout, useSendJsonData} from "jopi-rewrite-ui";
import { Button } from "@/shared/components/ui/button";

//TODO: replace by an automatique discover mechanism.
import "@/shared/lib/formHelpers";

import {CheckboxFormField, InputFormField} from "jopi-rewrite/uikit";
import {JForm} from "@/shared/lib/formHelpers";
import * as ns_schema from "jopi-node-space/ns_schema";

function PageContent() {
    const formSchema = ns_schema.schema({
        login: ns_schema.string("Login"),
        password: ns_schema.string("Password"),
        acceptConditions: ns_schema.boolean("Accept conditions"),
    });

    function onSubmit(values: ns_schema.infer<typeof formSchema>) {
        console.log("Will submit value:", values);
        doSubmitForm(values);
    }

    // doSubmitForm: a function allowing to do the submit.
    // serverResponse: what the server has returned.
    // isSending: true if is sending data and the response is not returned yet
    //
    const [doSubmitForm, serverResponse, isSending] = useSendJsonData((res) => {
        console.log("Form submitted. Response:", res);
    });

    return <>
        <div className="w-full flex flex-col items-center justify-center mt-20 relative">

            <h2 className="text-4xl text-gray-900 font-medium ">Register</h2>

            {
                serverResponse ?
                    <div className="w-full max-w-2xl mx-auto mt-4 border border-orange-500 bg-yellow-300 p-4">
                        <div className="text-center">You have been successfully registered.</div>
                    </div>
                    : undefined
            }

            <div className="mb-20"></div>

            <JForm schema={formSchema} className="space-y-8">
                    <InputFormField name="login"
                                    label="Login"/>

                    <InputFormField name="password"
                                    label="Password" description="Thank to use a strong password"
                                    placeholder="MyP@ssword"/>

                    <CheckboxFormField name="acceptConditions" label="Register to newsletter"
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