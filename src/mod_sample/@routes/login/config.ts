import {RouteConfig} from "jopi-rewrite";

export default function(ctx: RouteConfig) {
    // GET call will need the user to have
    // the roles "admin" and "writer".
    //
    ctx.onGET.add_requiredRole("admin", "writer");
}