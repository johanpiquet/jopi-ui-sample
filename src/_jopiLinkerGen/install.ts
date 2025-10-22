import {addListener} from "jopi-toolkit/jk_events";

let E1: undefined | ((event: any) => Promise<void>);
addListener("test.hello", async (e) => {
    if (!E1) E1 = (await import("@/events/test.hello")).default;       
    await E1(e);
});