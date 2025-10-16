import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
    type CheckboxFormFieldProps,
    IfTrue,
    type InputFormFieldProps,
    type JFieldController, UseIfDefined,
    useJFormField
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

export function TextFormField(p: InputFormFieldProps) {
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

export function CheckboxFormField(p: CheckboxFormFieldProps) {
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