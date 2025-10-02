import {getRouteServerContext} from "jopi-rewrite";

let ctx = getRouteServerContext();

ctx.onPOST(async req => {
    // Get the data to send to the server.
    const data = await req.getReqData();
    // Return it as-is, in JSON format.
    return req.jsonResponse(data);
});