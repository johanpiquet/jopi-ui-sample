import {jopiApp} from "jopi-rewrite";
import myUsers from "./myUsers.json" with { type: "json" };

// Allow using ui-kit features.
//registerUiKit();

/*jopiApp.globalConfig()
    .configure_tailwindProcessor()
    .setGlobalCssFilePath("./global2.css");*/

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.new_webSite()
        .use_modules()
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