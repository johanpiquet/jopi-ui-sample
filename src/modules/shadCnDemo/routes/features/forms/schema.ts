import * as ns_schema from "jopi-node-space/ns_schema";

/**
 * It's the schema of the data we want to use in our form and send to our server.
 * This schema allows validating the data.
 */
export const formSchema = ns_schema.schema({
    username: ns_schema.string("User name", false, {
        default: "myusername",
        errorMessage_theValueIsInvalid: "Username must be at least 2 characters."
    }),

    password: ns_schema.string("Password", false, {
        //default: "mysuperPassw@rd",
        placeholder: "My strong password",
        errorMessage_theValueIsInvalid: "Password must be at least 8 characters."
    }),

    allowNewsletter: ns_schema.boolean("Register to newsletter", false, {
        default: true,
        requireTrue: true,
        errorMessage_requireTrue: "You must accept the newsletter.",
        description: "By checking this box, you agree to our privacy policy and terms of use.",
        errorMessage_theValueIsInvalid: "You must accept the terms of use."
    })
});

export type FormValues = ns_schema.SchemaToType<typeof formSchema>;