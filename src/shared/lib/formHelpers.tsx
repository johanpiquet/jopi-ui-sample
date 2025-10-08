import { type UseFormReturn} from "react-hook-form";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/ui/form";

import { Input } from "@/shared/components/ui/input";
import React from "react";

type UiText = string | React.ReactNode;

export function InputFormField(p: {
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

export function CheckboxFormField(p: {
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