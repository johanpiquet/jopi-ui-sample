import {type LoginPassword, getRouteServerContext} from "jopi-rewrite";

let ctx = getRouteServerContext();

ctx.onPOST(async req => {
    const data = await req.getReqData(true);
    console.log("Post data:", data);

    let authResult = await req.tryAuthWithJWT(data as LoginPassword);

    if (!authResult.isOk) {
        console.log("Auth failed");
    }

    return req.jsonResponse({
        isOk: authResult.isOk,
        authResult: authResult
    });
});
