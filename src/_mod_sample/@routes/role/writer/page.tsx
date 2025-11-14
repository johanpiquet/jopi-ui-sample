import {RequireRoles} from "jopi-rewrite/uikit";
import AdminPageLayout from "@/uiBlocks/page.layout.admin";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["writer"]}>
            <div>Writer Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}