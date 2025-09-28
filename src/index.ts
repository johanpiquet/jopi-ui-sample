import {jopiApp} from "jopi-rewrite";

jopiApp.startApp(jopiEasy => {
    jopiEasy.new_webSite()
        .enable_reactRouter(import.meta, "content");
});