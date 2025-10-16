import {formSchema, type FormValues} from "./schema.ts";
import * as ns_timer from "jopi-node-space/ns_timer";
import {RouteServerContext} from "jopi-rewrite";

export default function(ctx: RouteServerContext) {
    ctx.onPOST(async req => {
        const data = await req.reqBodyAsJson<FormValues>(formSchema);

        console.log("Server received:", data);

        // Allow testing the submit button hiding when submitting.
        await ns_timer.tick(1000);

        return req.jsonResponse({isOk: true, data});
    });
}
