import {AdminPageLayout, MenuName, useMenu} from "jopi-rewrite-ui";

export default function() {
    const menu = useMenu(MenuName.LEFT_MENU);

    console.log(menu);

    return <AdminPageLayout>
        <div>Tools</div>
    </AdminPageLayout>
}