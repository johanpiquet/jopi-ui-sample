import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
    type JCheckboxFormFieldProps,
    IfTrue,
    type JInputFormFieldProps,
    type JFieldController, UseIfDefined,
    useJFormField, type JFormMessageProps, type UiText
} from "jopi-rewrite/uikit";
import * as LabelPrimitive from "@radix-ui/react-label";
import {cn} from "@/shared/lib/utils";

function MyLabel({field, ...p}: React.ComponentProps<typeof LabelPrimitive.Root> & {field: JFieldController}) {
    return <Label
        data-slot="form-label"
        data-error={field.error}
        className={cn("data-[error=true]:text-destructive", p.className)}
        htmlFor={field.name}
        {...p}
    />
}

export function TextFormField(p: JInputFormFieldProps) {
    let field = useJFormField(p.name);

    return <div className="grid gap-2">
        {p.title ? <MyLabel field={field}>{p.title}</MyLabel> : undefined}

        <Input id={p.id} className={p.className} placeholder={p.placeholder}
               onChange={e => field.onChange(e.target.value)}
               value={field.value}
        />

        { UseIfDefined(p.description) }
        { IfTrue(field.error, <div className="text-destructive">{field.errorMessage}</div>) }

    </div>
}

export function CheckboxFormField(p: JCheckboxFormFieldProps) {
    let field = useJFormField(p.name);

    return <div className="grid gap-2">
        <Label className="flex items-start gap-3">
            <Checkbox id={p.id} className={p.className}
                      defaultChecked={p.defaultChecked === true}
                      checked={field.value === true}
                      onCheckedChange={(checked) => { field.onChange(checked === true) }}
            />
            <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">{p.title}</p>
                {IfTrue(p.description ,<p className="text-muted-foreground text-sm">{p.description}</p>)}
                {IfTrue(field.error ,<div className="text-destructive">{field.errorMessage}</div>)}
            </div>
        </Label>
    </div>
}

export const NumberFormField = TextFormField;

function ConfirmMessage({children}: { children: React.ReactNode }) {
    return <div className="flex items-center justify-center">
            <div className="max-w-3xl w-full p-2 bg-green-100 border border-green-500 rounded-lg shadow-lg text-center">
                <p className="text-sm font-semibold text-green-800">
                    {children}
                </p>
            </div>
        </div>
}

function ErrorMessage({children}: { children: React.ReactNode }) {
    return <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full p-2 bg-red-100 border border-red-500 rounded-lg shadow-lg text-center">
            <p className="text-sm font-semibold text-red-800">
                {children}
            </p>
        </div>
    </div>;
}

export function FormMessage({message, ...p}: JFormMessageProps) {
    if (!message) return null;

    if (message.isSubmitted) {
        // false means hiding the message.
        if (p.submittedMessage === false) return null;

        let t: UiText = "Form has been submitted";
        if (p.submittedMessage) t = p.submittedMessage;
        else if (message.message) t = message.message;

        return <ConfirmMessage>{t}</ConfirmMessage>
    }

    if (message.isOk) {
        // Ok but not submitted? Hidde.
        return null;
    }

    if (message.fieldErrors) {
        // false means hiding the message.
        if (p.fieldErrorMessage === false) return null;
    }

    let t: UiText = "Form has errors";

    if (message.fieldErrors) {

        if (p.fieldErrorMessage) t = p.fieldErrorMessage;
        else t = "Some fields have errors";
    } else {
        if (p.errorMessage) t = p.errorMessage;
        else if (message.message) t = message.message;
    }

    return <ErrorMessage>{t}</ErrorMessage>
}