import E1 from "../../mod_moduleA/@listeners/test.hello/l2/index.ts";
import E2 from "../../mod_moduleA/@listeners/test.hello/l1/index.ts";

export default async function(e: any) {
   let r1: any = E1(e);
   if (r1 instanceof Promise) await r1;
   if (e.canceled || e.isCatch) return;
   let r2: any = E2(e);
   if (r2 instanceof Promise) await r2;
   if (e.canceled || e.isCatch) return;
}