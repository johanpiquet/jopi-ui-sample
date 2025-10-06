import {type LoginPassword, getRouteServerContext} from "jopi-rewrite";

let ctx = getRouteServerContext();

ctx.onPOST(async req => {
    const data = await req.getReqData(true);
    const authResult = await req.tryAuthWithJWT(data as LoginPassword);

    if (!authResult.isOk) console.log("Auth failed");

    // Will automatically set a cookie.
    // It why we don't core of the details here.
    return req.jsonResponse({isOk: authResult && authResult.isOk});
});
