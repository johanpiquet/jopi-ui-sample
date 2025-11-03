import {usePageParams} from "jopi-rewrite/uikit";

export default function Product() {
    //BUG: renvoie n'importe quoi avec bunjs
    const pageParams = usePageParams();
    return <div>Product {JSON.stringify(pageParams)}</div>;
}