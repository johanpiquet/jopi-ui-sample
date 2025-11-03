import {AdminPageLayout, RequireRoles} from "../../../../../../../__packages/jopi-rewrite/src/@uikit";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["writer"]}>
            <div>Writer Role Only</div>
        </RequireRoles>
    </AdminPageLayout>
}