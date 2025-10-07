import {AdminPageLayout, RequireRoles} from "jopi-rewrite-ui";

export default function() {
    return <AdminPageLayout>
        <RequireRoles roles={["admin"]}>
            <div>Admin Page A</div>
        </RequireRoles>
    </AdminPageLayout>
}