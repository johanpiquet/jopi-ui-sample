import {z} from "zod";

/**
 * It's the schema of the data we want to use in our form and send to our server.
 * This schema allows validating the data.
 */
export const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    allowNewsletter: z.boolean().refine((value) => value === true, { message: "You must accept the terms of use." }),
});

export function getFormDefaultValues(): FormValues {
    return {
        username: "myusername",
        password: "mysuperPassw@rd",
        allowNewsletter: true
    };
}

export type FormValues = z.infer<typeof formSchema>;