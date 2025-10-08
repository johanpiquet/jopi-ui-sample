import React from "react";
import {AdminPageLayout, useSendJsonData} from "jopi-rewrite-ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {Form} from "@/shared/components/ui/form";
import {CheckboxFormField, InputFormField} from "@/shared/lib/formHelpers";
import {formSchema, getFormDefaultValues} from "./schema.ts";

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

    const [doSubmitForm, _serverResponse] = useSendJsonData((res) => {
        console.log("Form submitted. Response:", res);
    });

    return <>

        <HelpMessage/>

        <div className="w-full flex flex-col items-center justify-center mt-20">

            <h2 className="text-4xl text-gray-900 font-medium mb-20">Register</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <InputFormField name="username" form={form}
                                    label="User name"/>

                    <InputFormField name="password" form={form}
                                    label="Password" description="Thank to use a strong password"
                                    placeholder="MyP@ssword"/>

                    <CheckboxFormField form={form} name="allowNewsletter" label="Register to newsletter"
                                       description="By checking this box, you agree to our privacy policy and terms of use."/>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    </>
}

function HelpMessage() {
    return <blockquote className="border-l-2 border-gray-600 pl-6 italic bg-gray-100 text-gray-600">
        <strong>This sample shows you how to use the form features.</strong><br/>
        ✓ Easy form display ✓ With automatic data validation ✓ Error message handling.
    </blockquote>
}

export default function() {
    return <AdminPageLayout>
        <PageContent />
    </AdminPageLayout>
}