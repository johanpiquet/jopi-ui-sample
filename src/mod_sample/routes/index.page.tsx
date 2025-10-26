import cssUrl from "./my-styles.css";

export default function Page() {
    function doClick() {
        alert("click");
    }

    return <div onClick={doClick}>Ma page</div>
}