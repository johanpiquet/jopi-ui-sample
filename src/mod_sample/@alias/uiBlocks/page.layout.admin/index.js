"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var app_sidebar_tsx_1 = require("../../../components/app-sidebar.tsx");
var breadcrumb_1 = require("@/shared/components/ui/breadcrumb");
var separator_1 = require("@/shared/components/ui/separator");
var sidebar_1 = require("@/shared/components/ui/sidebar");
var react_1 = require("react");
var uikit_1 = require("jopi-rewrite/uikit");
function MyBreadcrumb() {
    var menuItem = (0, uikit_1.useMatchingMenuItem)();
    if (!menuItem)
        return;
    var baseKey = menuItem.reactKey;
    var B = menuItem.breadcrumb;
    if (typeof (B) === "function") {
        return <B />;
    }
    else if (B instanceof Array) {
        var list = __spreadArray([], B, true);
        var lastTitle = list.pop();
        var titles_1 = [];
        list.forEach(function (title) {
            titles_1.push(<breadcrumb_1.BreadcrumbItem key={baseKey + titles_1.length} className="hidden md:block">
                <breadcrumb_1.BreadcrumbLink>{title}</breadcrumb_1.BreadcrumbLink>
            </breadcrumb_1.BreadcrumbItem>);
            titles_1.push(<breadcrumb_1.BreadcrumbSeparator key={baseKey + titles_1.length} className="hidden md:block"/>);
        });
        titles_1.push(<breadcrumb_1.BreadcrumbItem key={baseKey + titles_1.length}><breadcrumb_1.BreadcrumbPage>{lastTitle}</breadcrumb_1.BreadcrumbPage></breadcrumb_1.BreadcrumbItem>);
        return <breadcrumb_1.Breadcrumb>
            <breadcrumb_1.BreadcrumbList>{titles_1}</breadcrumb_1.BreadcrumbList>
        </breadcrumb_1.Breadcrumb>;
    }
    return null;
}
function Layout(_a) {
    var children = _a.children;
    return (<sidebar_1.SidebarProvider>
            <app_sidebar_tsx_1.AppSidebar />
            <sidebar_1.SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <sidebar_1.SidebarTrigger className="-ml-1"/>
                        <separator_1.Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
                        <MyBreadcrumb />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </sidebar_1.SidebarInset>
        </sidebar_1.SidebarProvider>);
}
function default_1(_a) {
    var children = _a.children;
    // Will send the event "app.router.locationUpdated".
    (0, uikit_1.useSendRouterLocationUpdateEvent)();
    return <Layout>{children}</Layout>;
}
