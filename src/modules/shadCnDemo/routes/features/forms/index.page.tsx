import React from "react";
import {AdminPageLayout, useSendJsonData} from "jopi-rewrite-ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {Form} from "@/shared/components/ui/form";
import {CheckboxFormField, InputFormField} from "@/shared/lib/formHelpers";
import {formSchema, getFormDefaultValues} from "./schema.ts";

import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card"

function PageContent() {
    // It's our form object, which will allows managing our form state.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: getFormDefaultValues()
    });

    // It's the function called once the form is validated (again his schema)
    function onSubmit(values: z.infer<typeof formSchema>) {
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

        <HelpMessage/>

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

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputFormField name="username" form={form}
                                    label="User name"/>

                    <InputFormField name="password" form={form}
                                    label="Password" description="Thank to use a strong password"
                                    placeholder="MyP@ssword"/>

                    <CheckboxFormField form={form} name="allowNewsletter" label="Register to newsletter"
                                       description="By checking this box, you agree to our privacy policy and terms of use."/>

                    { isSending ? undefined : <Button type="submit">Submit</Button> }
                </form>
            </Form>
        </div>
    </>
}

function HelpMessage() {
    return <div className="grid grid-cols-2 gap-4">
        <Card>
            <CardHeader><CardTitle>About this sample</CardTitle></CardHeader>
            <CardContent>
                This sample shows you how to use the form features.<br/>
                ✓ Easy form display<br/>
                ✓ With automatic data validation<br/>
                ✓ Error message handling.<br/>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>What to see?</CardTitle></CardHeader>
            <CardContent>
                <strong>Front part:</strong><br/>
                ✓ How to create a form.<br/>
                ✓ How to validate this form.<br/>
                ✓ How to confirm form submission.<br/>
                <br/>
                <strong>Server part:</strong><br/>
                ✓ How to validate the data.<br/>
            </CardContent>
        </Card>
    </div>
}

export default function() {
    return <AdminPageLayout>
        <PageContent />
    </AdminPageLayout>
}