import {JopiRequest, RouteConfig} from "jopi-rewrite";

async function ipMiddleware(req: JopiRequest) {
    let ip = req.requestIP?.address;
    console.log("Caller IP is", ip);
    if (ip==="127.0.0.1") return null;
    return req.returnError401_Unauthorized();
}

export default function (config: RouteConfig) {
    config.onGET.addMiddleware(ipMiddleware);
}