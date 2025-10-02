import {jopiApp} from "jopi-rewrite";

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.new_webSite()
        .enable_automaticRoutes()

        .use_modules()
            .add_module("adminLayout")
            .END_use_modules();
});