import {AdminPageLayout, RequireRoles} from "jopi-rewrite/uikit";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["admin"]}>
            <div>Admin Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}