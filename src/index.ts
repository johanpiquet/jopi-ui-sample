import {jopiApp} from "jopi-rewrite";
import {registerUiKit} from "jopi-rewrite/uikit";
import myUsers from "./myUsers.json" with { type: "json" };

// Allow using ui-kit features.
registerUiKit();

jopiApp.globalConfig()
        .configure_reactRouter()
            .disableReactRouter();

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.new_webSite()
        .enable_automaticRoutes()

        .use_modules()
            .add_module("shadCnDemo")
            .END_use_modules()

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