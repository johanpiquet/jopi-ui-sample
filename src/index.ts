import {jopiApp} from "jopi-rewrite";
import {registerUiKit} from "jopi-rewrite/uikit";
import myUsers from "./myUsers.json" with { type: "json" };
import * as jk_events from "jopi-toolkit/jk_events";

import "./_jopiLinkerGen/install.ts";

// Allow using ui-kit features.
registerUiKit();

await jk_events.sendAsyncEvent("test.hello");

//jopiApp.globalConfig().configure_bundler().dontEmbed_ReactJS().dontEmbed_ReactRouter();
//jopiApp.globalConfig().configure_reactRouter().disableReactRouter();

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.new_webSite()
        .enable_automaticRoutes()

        .use_modules()
            .add_module("shadCnDemo")
            .END_use_modules()

        .add_SseEvent("/my-sse-event", {
            getWelcomeMessage() {
                return "hello world";
            },

            handler(controller) {
                let count = 0;

                setInterval(() => {
                   // controller.send("change", "count: " + count++);
                }, 1000);
            },
        })

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