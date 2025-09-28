import {usePageParams} from "jopi-rewrite-ui";

export default function() {
    let params = usePageParams();

    return <div>
        Details page for user {params.id}
    </div>;
}