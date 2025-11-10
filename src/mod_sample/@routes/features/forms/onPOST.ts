import {JopiRequest} from "jopi-rewrite";
import type {FormValues} from "./schema";
import * as jk_timer from "jopi-toolkit/jk_timer";

export default async function(req: JopiRequest) {
    const data = await req.getBodyData<FormValues>();

    console.log("Server received:", data);

    let photo = data.photo;
    //
    if (photo instanceof File) {
        console.log("My file:", await photo.text());
    }

    // Allow testing the submit button hiding when submitting.
    await jk_timer.tick(1000);

    return req.returnResultMessage(true);
}