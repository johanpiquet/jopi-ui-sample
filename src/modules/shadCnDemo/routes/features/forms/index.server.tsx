import {formSchema, type FormValues} from "./schema.ts";
import * as ns_timer from "jopi-node-space/ns_timer";
import {RouteServerContext} from "jopi-rewrite";

export default function(ctx: RouteServerContext) {
    ctx.onPOST(async req => {
        //const data = await req.getReqData<FormValues>({dataSchema: formSchema});
        const data = await req.getReqData<FormValues>();

        console.log("Server received:", data);

        let photo = data.photo;
        //
        if (photo instanceof File) {
            console.log("My file:", await photo.text());
        }

        // Allow testing the submit button hiding when submitting.
        await ns_timer.tick(5000);

        return req.jsonResponse({isOk: true, data});
    });
}
