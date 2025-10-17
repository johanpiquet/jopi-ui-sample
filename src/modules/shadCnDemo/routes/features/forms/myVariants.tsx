import React from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import {
    type JCheckboxFormFieldProps,
    IfTrue,
    type JInputFormFieldProps,
    type JFieldController, UseIfDefined,
    useJFormField, type JFormMessageProps, type UiText, type JFileSelectFieldProps
} from "jopi-rewrite/uikit";
import * as LabelPrimitive from "@radix-ui/react-label";
import {cn} from "@/shared/lib/utils";
import type {FileList} from "jopi-node-space/ns_schema";

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
    const field = useJFormField(p.name);

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
    const field = useJFormField(p.name);

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

export function FormMessage({message, ...p}: JFormMessageProps) {
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

export function FileSelectField(p: JFileSelectFieldProps) {
    const field = useJFormField(p.name);
    const fieldValue = field.value as FileList;

    const [isDragOver, setIsDragOver] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            debugger;
            field.onChange(files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            debugger;
            field.onChange(files);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
            />

            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200",
                    isDragOver 
                        ? "border-primary bg-primary/5" 
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                )}
            >
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                    </div>

                    <div>
                        <p className="text-lg font-medium">
                            {isDragOver ? "Drop your file here" : "Click to select a file"}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            or drag-drop a file here
                        </p>
                    </div>
                </div>
            </div>

            {fieldValue && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-sm">{fieldValue[0].name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(fieldValue[0].size)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(undefined);
                            }}
                            className="p-1 hover:bg-destructive/10 rounded transition-colors"
                        >
                            <svg
                                className="w-4 h-4 text-destructive"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}