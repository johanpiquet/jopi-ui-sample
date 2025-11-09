import {jopiApp} from "jopi-rewrite";
import myUsers from "./myUsers.json" with { type: "json" };

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.use_webSite()

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