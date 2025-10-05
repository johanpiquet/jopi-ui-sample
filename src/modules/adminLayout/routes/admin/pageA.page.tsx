import PageLayout from "../../components/PageLayout.tsx";
import {RequireRoles} from "jopi-rewrite-ui";

export default function() {
    return <PageLayout>
        <RequireRoles roles={["admin"]}>
            <div>Admin Page A</div>
        </RequireRoles>
    </PageLayout>
}