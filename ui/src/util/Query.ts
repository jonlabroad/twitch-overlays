import { useLocation } from "react-router";

export function useStreamer() {
    const query = useQuery();
    const streamer = query.get("streamer");
    return streamer;    
}

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}