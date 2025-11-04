import {formSchema, type FormValues} from "./schema.ts";
import * as jk_timer from "jopi-toolkit/jk_timer";
import {RouteConfig} from "jopi-rewrite";

export default function(ctx: RouteConfig) {
    ctx.onPOST(async req => {
        const data = await req.getBodyData<FormValues>();

        console.log("Server received:", data);

        let photo = data.photo;
        //
        if (photo instanceof File) {
            console.log("My file:", await photo.text());
        }

        // Allow testing the submit button hiding when submitting.
        await jk_timer.tick(1000);

        return req.returnResultMessage(true);
    });
}
