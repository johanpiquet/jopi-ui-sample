import {JopiRequest, ServerFetch} from "jopi-rewrite";

// Mozilla website
const DIST_URL = "https://developer.mozilla.org";
const fetcher = ServerFetch.useOrigin(DIST_URL);

export default async function(req: JopiRequest) {
    // Will call the server.
    //let res = await req.fetchServer();

    // Fetch the server.
    // Here it will automatically calculate the target url.
    let res = await fetcher.fetchWith(req);

    // Will replace https://developer.mozilla.org by http://127.0.0.1:3000
    // 302: allow forcing redirection 302 if redirecting.
    res = await req.replaceWebSiteOrigin(res, DIST_URL, 302);

    return res;
}