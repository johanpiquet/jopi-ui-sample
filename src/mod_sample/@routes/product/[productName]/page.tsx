import {useParams} from "jopi-rewrite/uikit";

export default function Product() {
    const pageParams = useParams();
    return <div>Product {JSON.stringify(pageParams)}</div>;
}