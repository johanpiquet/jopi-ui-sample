import {jopiApp} from "jopi-rewrite";

jopiApp.startApp(import.meta, jopiEasy => {
    jopiEasy.create_webSiteDownloader("https://developer.mozilla.org")
        .set_outputDir("./temp/mozilla")
        .on_urlProcessed(info => console.log("Downloaded: ", info.localUrl))
        .START_DOWNLOAD();
});