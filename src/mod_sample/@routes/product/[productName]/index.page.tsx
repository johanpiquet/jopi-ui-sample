import {usePageParams} from "jopi-rewrite/uikit";

export default function Product() {
    const pageParams = usePageParams();
    return <div>Product {JSON.stringify(pageParams)}</div>;
}