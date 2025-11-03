import {AdminPageLayout, RequireRoles} from "../../../../../../../__packages/jopi-rewrite/src/@uikit";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["admin"]}>
            <div>Admin Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}