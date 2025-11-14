import {JopiEasyWebSite} from "jopi-rewrite";

export default async function(webSite: JopiEasyWebSite) {
    webSite.add_sourceServer()
        .useOrigin("https://developer.mozilla.org")

        // Set his weight
        .set_weight(0.5)

        // Can also be
        //.set_isMainServer()
        //.set_isBackupServer()

        // Is called to start the remote server.
        /*.do_startServer(async () => {
            console.log("Starting Mozilla Server");

            // Wait 5 sec before stopping the server
            return 5;
        })

        // Allow stopping the remote server.
        .do_stopServer(async () => {
            console.log("Stopping Mozzila Server");
        })*/

        .END_add_sourceServer()
}