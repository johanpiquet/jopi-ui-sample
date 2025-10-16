import React from "react";
import {AdminPageLayout, JAutoFormField, JFormMessage} from "jopi-rewrite/uikit";
import {Button} from "@/shared/components/ui/button";
import * as myVariants from "./myVariants.tsx";

import {JForm, JFormStateListener} from "jopi-rewrite/uikit";
import {formSchema} from "./schema.ts";

function PageContent() {
    return <>
        <div className="w-full flex flex-col items-center justify-center mt-20 relative">

            <h2 className="text-4xl text-gray-900 font-medium">Register</h2>

            <div className="mb-20"></div>

            <JForm schema={formSchema} className="space-y-8" variants={myVariants}>

                <JFormMessage isBefore={true}
                              submittedMessage="Form has been submitted"
                              errorMessage="An error occured (test)"
                              fieldErrorMessage="Some value a invalide (test)"

                />
                <JAutoFormField name="username" />
                <JAutoFormField name="password" />
                <JAutoFormField name="age" />
                <JAutoFormField name="allowNewsletter" />

                <JFormStateListener ifNotSubmitted={<Button type="submit">Submit</Button> } />
            </JForm>
        </div>
    </>
}

export default function() {
    return <AdminPageLayout>
        <PageContent />
    </AdminPageLayout>
}