import * as ns_schema from "jopi-node-space/ns_schema";

export const Schema = ns_schema.schema({
    name: ns_schema.string("name", false),
});

ns_schema.registerSchema(
    "d99e8745-9ae0-4de3-a23b-657203caa3fc", Schema,
    {
        title: "Person",
        description: "A person"
    });

export type Type = ns_schema.SchemaToType<typeof Schema>;