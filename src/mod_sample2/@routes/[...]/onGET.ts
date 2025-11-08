import {JopiRequest, ServerFetch} from "jopi-rewrite";

const sf = ServerFetch.useOrigin("http://myserverurl");

export default async function (req: JopiRequest) {
    return await req.proxyRequestTo(sf);
}