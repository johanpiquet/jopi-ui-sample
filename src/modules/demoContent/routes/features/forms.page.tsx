import {AdminPageLayout} from "jopi-rewrite-ui";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn} from "react-hook-form";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/components/ui/form";

import { Input } from "@/shared/components/ui/input";
import React from "react";

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    allowNewsletter: z.boolean().refine((value) => value === true, { message: "You must accept the terms of use." }),
});

function PageContent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "myusername",
            password: "mysuperPassw@rd",
            allowNewsletter: true
        }
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <InputFormField name="username" form={form}
                            label="User name" />

            <InputFormField name="password" form={form}
                            label="Password" description="Thank to use a strong password" placeholder="MyP@ssword" />

            <CheckboxFormField form={form} name="allowNewsletter" label="Register to newsletter" description="By checking this box, you agree to our privacy policy and terms of use." />

            <Button type="submit">Submit</Button>
        </form>
    </Form>
}

type UiText = string | React.ReactNode;

function InputFormField(p: {
    name: string,
    form: UseFormReturn<any>,

    id?: string,
    className?: string,

    label?: UiText,
    description?: UiText,
    placeholder?: string
}) {
    return <FormField name={p.name} control={p.form.control} render={({ field }) => (
        <FormItem>
            {p.label ? <FormLabel>{p.label}</FormLabel> : undefined}
            <FormControl><Input id={p.id} className={p.className} placeholder={p.placeholder} {...field} /></FormControl>
            {p.description ? <FormDescription>{p.description}</FormDescription> : undefined}
            <FormMessage />
        </FormItem>
    )} />
}

function CheckboxFormField(p: {
    name: string,
    form: UseFormReturn<any>,
    label: UiText,

    id?: string,
    className?: string,
    containerClassName?: string,
    labelClassName?: string,
    descriptionClassName?: string,

    defaultChecked?: boolean,
    description?: UiText
}) {
    return <FormField name={p.name} control={p.form.control} render={({ field, fieldState }) => (
        <FormItem>
            <FormControl>
                <Label className={p.containerClassName || "flex items-start gap-3"}>
                    <Checkbox id={p.id} className={p.className}
                              defaultChecked={p.defaultChecked === true}
                              checked={field.value === true}
                              onCheckedChange={(checked) => { field.onChange(checked===true)}}
                    />
                    <div className="grid gap-1.5 font-normal">
                        <p className={p.labelClassName || "text-sm leading-none font-medium"}>{p.label}</p>
                        {p.description && !fieldState.error ? <FormDescription><p className={p.descriptionClassName || "text-muted-foreground text-sm"}>{p.description}</p></FormDescription> : undefined}
                        <FormMessage />
                    </div>
                </Label>
            </FormControl>
        </FormItem>
    )} />
}

export default function() {
    return <AdminPageLayout>
        <PageContent />
    </AdminPageLayout>
}