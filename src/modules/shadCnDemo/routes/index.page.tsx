import {AdminPageLayout} from "jopi-rewrite/uikit";

export default function Page() {
    return <AdminPageLayout>
        <Test />
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </AdminPageLayout>
}

function Test() {
    return <div className="text-yellow-400">Test 1</div>;
}