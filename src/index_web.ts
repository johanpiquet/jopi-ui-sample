import {jopiApp} from "jopi-rewrite";
import myUsers from "./myUsers.json" with { type: "json" };

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.create_creatWebSiteServer()
        .configure_behaviors()
            .removeTrailingSlashs(true)
            .END_configure_behaviors()

        .enable_cors()
            .add_allowedHost("http://mywebsiteB")

            .disable_cors()
            .DONE_enableCors()

        // Add a JWT Token mechanism for user authentification
        // and user info retrieval.
        //
        .enable_jwtTokenAuth()
            // WARNING: you must change this key!
            .step_setPrivateKey("my-private-key")
            .step_setUserStore()
                .use_simpleLoginPassword()
                    .addMany(myUsers)
                    .DONE_use_simpleLoginPassword()
                .DONE_setUserStore()
            .DONE_enable_jwtTokenAuth()
    });