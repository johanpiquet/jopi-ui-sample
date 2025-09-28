import {jopiApp} from "jopi-rewrite";

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.new_webSite()
        .enable_reactRouter("content")

        .add_module("moduleA")
});