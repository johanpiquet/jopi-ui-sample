import {useParams} from "jopi-rewrite/uikit";

export default function Product({params, searchParams}: any) {
    //const pageParams = useParams();
    return <div>
        <div>Product {JSON.stringify(params)}</div>
        <div>Search params {JSON.stringify(searchParams)}</div>
    </div>;
}