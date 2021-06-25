import { useEffect, useRef } from "react";
import StreamElementsClient from "../service/StreamElementsClient";

export function useStreamElements(dispatch: any) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWY4YTUzODZjZDQ0NDg1ZTlmZDM2OGE2Iiwicm9sZSI6Im93bmVyIiwiY2hhbm5lbCI6IjVmOGE1Mzg2Y2Q0NDQ4NmJmNmQzNjhhNyIsInByb3ZpZGVyIjoidHdpdGNoIiwiYXV0aFRva2VuIjoibEd3X3lyYTNFNXl5NmZ2YThwMFRMcmFjempGNXJWNUhrTmNZLVIzcmNvSFNZMVVhIiwiaWF0IjoxNjIyNzUxNDY5LCJpc3MiOiJTdHJlYW1FbGVtZW50cyJ9.i7LeCsFpLXGfnT5zCbDEhmL8ROmQJGifBcYZliyIack";

    const client = useRef(new StreamElementsClient(token, (ev: any) => handleEvent(ev, dispatch)));

    useEffect(() => {
        client.current.connect();
    }, []);
}

function handleEvent(data: any, dispatch: any) {
    if (data.listener === "follower-latest") {
        console.log(`New follow: ${data.event.name}`);
        dispatch({
            type: "new_follower",
            event: data.event
        });
    }
}