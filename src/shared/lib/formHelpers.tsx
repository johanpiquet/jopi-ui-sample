import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";

import { Input } from "@/shared/components/ui/input";
import React, {useContext} from "react";
import {getVariantProvider} from "jopi-rewrite-ui";

import {
    type CheckboxFormFieldProps,
    type InputFormFieldProps,
    VariantId_CheckboxFormField,
    VariantId_InputFormField
} from "jopi-rewrite/uikit";
import type {Schema} from "jopi-node-space/ns_schema";
import * as LabelPrimitive from "@radix-ui/react-label";
import {cn} from "@/shared/lib/utils";

export interface FormContextValues {
    schema: Schema;
    action?: string;
}

const FormContext = React.createContext<FormContextValues>(undefined as unknown as FormContextValues);

export function useForm() {
    const form = useContext(FormContext);
    if (!form) {
        throw new Error("useForm must be used within a Form");
    }
    return form;
}

export function JForm({children, className, ...p}: { children: React.ReactNode, className?: string } & FormContextValues) {
    return <FormContext.Provider value={p}>
        <form className={className}>
            {children}
        </form>
    </FormContext.Provider>
}

function JFormLabel({className, ...props}: React.ComponentProps<typeof LabelPrimitive.Root>) {
    const error = false;
    const formItemId = "form-item";

    return (
        <Label
            data-slot="form-label"
            data-error={!!error}
            className={cn("data-[error=true]:text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    )
}

function JFormItem({ className, ...props }: React.ComponentProps<"div">) {
    const id = React.useId()

    return <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
    />
}

const V_InputFormField = getVariantProvider(VariantId_InputFormField);

V_InputFormField.setDefault((p: InputFormFieldProps) => {
    const form = useForm();

    return <JFormItem>
        {p.label ? <JFormLabel>{p.label}</JFormLabel> : undefined}
        <Input id={p.id} className={p.className} placeholder={p.placeholder} {...p} />
        {p.description ? p.description : undefined}
    </JFormItem>
});

const V_CheckboxFormField = getVariantProvider(VariantId_CheckboxFormField);

V_CheckboxFormField.setDefault((p: CheckboxFormFieldProps) => {
    const form = useForm();
    const field: any = {};

    return <JFormItem>
        <Label className={p.containerClassName || "flex items-start gap-3"}>
            <Checkbox id={p.id} className={p.className}
                      defaultChecked={p.defaultChecked === true}
                      checked={field.value === true}
                      onCheckedChange={(checked) => {
                          field.onChange(checked === true)
                      }}
            />
            <div className="grid gap-1.5 font-normal">
                <p className={p.labelClassName || "text-sm leading-none font-medium"}>{p.label}</p>
                {
                    p.description && !field.error
                        ? <p className={p.descriptionClassName || "text-muted-foreground text-sm"}>{p.description}</p>
                        : undefined
                }
            </div>
        </Label>
    </JFormItem>
});