import {RouteConfig} from "jopi-rewrite";

export default function (config: RouteConfig) {
    config.onGET.cache_disableAutomaticCache();

    config.onGET.cache_beforeCheckingCache(async req => {
        console.log("beforeCheckingCache");
    });

    config.onGET.cache_beforeAddToCache(async (req, res) => {
        console.log("beforeAddToCache");
        return res;
    });

    config.onGET.cache_afterGetFromCache(async req => {
        console.log("afterGetFromCache");
    });
}