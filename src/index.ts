import {jopiApp} from "jopi-rewrite";
import myUsers from "./myUsers.json" with { type: "json" };

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.create_creatWebSiteServer()
        .configure_cache()
            //.use_fileSystemCache(".cache")
            .add_cacheRules({
                regExp: /\/users\/.*$/,
                disableAutomaticCache: true
            })
            .END_configure_cache()

        .enable_cors()
            .add_allowedHost("http://mywebsiteB")

            .disable_cors()
            .DONE_enableCors()

        // Add a JWT Token mechanism for user authentification
        // and user info retrieval.
        //
        .add_jwtTokenAuth()
            // WARNING: you must change this key!
            .step_setPrivateKey("my-private-key")
            .step_setUserStore()
                .use_simpleLoginPassword()
                    .addMany(myUsers)
                    .DONE_use_simpleLoginPassword()
                .DONE_setUserStore()
            .DONE_add_jwtTokenAuth()
    });