import {getRouteServerContext} from "jopi-rewrite";
import {formSchema} from "./schema.ts";

let ctx = getRouteServerContext();

ctx.onPOST(async req => {
    //const data = await req.reqBodyAsJson(formSchema);
    const data = await req.getReqData({zodSchema: formSchema});

    console.log("Server received:", data);
    return req.jsonResponse({isOk: true, data});
});
