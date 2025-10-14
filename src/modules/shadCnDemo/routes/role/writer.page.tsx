import {AdminPageLayout, RequireRoles} from "jopi-rewrite/ui";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["writer"]}>
            <div>Writer Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}