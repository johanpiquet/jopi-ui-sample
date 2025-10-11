import {formSchema} from "./schema.ts";
import {nTimer} from "jopi-node-space";
import {RouteServerContext} from "jopi-rewrite";

export default function(ctx: RouteServerContext) {
    ctx.onPOST(async req => {
        const data = await req.reqBodyAsJson(formSchema);

        console.log("Server received:", data);

        // Allow testing the submit button hiding when submitting.
        await nTimer.tick(1000);

        return req.jsonResponse({isOk: true, data});
    });
}
