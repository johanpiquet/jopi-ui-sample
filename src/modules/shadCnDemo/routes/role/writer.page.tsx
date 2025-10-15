import {RequireRoles} from "jopi-rewrite/ui";
import {AdminPageLayout} from "jopi-rewrite/uikit";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["writer"]}>
            <div>Writer Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}