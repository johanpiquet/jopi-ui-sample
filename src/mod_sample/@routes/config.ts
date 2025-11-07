import {JopiRequest, RouteConfig} from "jopi-rewrite";

async function ipMiddleware(req: JopiRequest) {
    let ip = req.requestIP?.address;
    console.log("Caller IP is", ip);

    // undefined means it will continue to the next middleware.
    if (ip==="127.0.0.1") return null;

    // Returning a response stops the request processing.
    return req.returnError401_Unauthorized();
}

export default function (config: RouteConfig) {
    config.onGET.addMiddleware(ipMiddleware);
}