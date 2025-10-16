import * as ns_schema from "jopi-node-space/ns_schema";

/**
 * It's the schema of the data we want to use in our form and send to our server.
 * This schema allows validating the data.
 */
export const formSchema: ns_schema.Schema = {
    username: ns_schema.string("User name", false, { errorMessage_theValueIsInvalid: "Username must be at least 2 characters." }),
    password: ns_schema.string("Password", false, { errorMessage_theValueIsInvalid: "Password must be at least 8 characters." }),
    allowNewsletter: ns_schema.boolean("Allow Newsletter", false, {errorMessage_theValueIsInvalid: "You must accept the terms of use." }),
};

export function getFormDefaultValues(): FormValues {
    return {
        username: "myusername",
        password: "mysuperPassw@rd",
        allowNewsletter: true
    };
}

export type FormValues = ns_schema.SchemaToType<typeof formSchema>;