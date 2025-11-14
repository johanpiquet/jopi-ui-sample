import {useUserInfos} from "jopi-rewrite/uikit";

export default async function() {
    const user = useUserInfos();

    if (user) {
        return <div>
            <div>Hello {user.name}</div>
            <div>You roles: {user.roles?.join(", ")}</div>
        </div>;
    }
    else {
        console.log("not connected");
    }
}