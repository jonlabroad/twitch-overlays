import React, { useContext, useEffect, useState } from "react"
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate";
import { FollowerEvent } from "../../service/StreamElementsTypes"
import { StreamElementsStateContext } from "../StreamElementsContainer";

export interface HoagieFollowerAlertProps {
}

export const HoagieFollowerAlert = (props: HoagieFollowerAlertProps) => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);
    const [currentFollows, setCurrentFollows] = useState<FollowerEvent[]>([]);
    const [displayFollow, setDisplayFollow] = useState<FollowerEvent | undefined>(undefined);

    const seContext = useContext(StreamElementsStateContext);
    const latestFollow = seContext.state.followers.follows[seContext.state.followers.follows.length - 1];
console.log({currentFollows});
console.log({displayFollow});
    useEffect(() => {
        console.log({streamAlert: (window as any).streamAlert});
        if (latestFollow) {
            console.log({setFollows: [...currentFollows, latestFollow]})
            setCurrentFollows([...currentFollows, latestFollow]);
        }

        if (!displayFollow) {
            setDisplayFollow(latestFollow);
        }
    }, [latestFollow]);

    useEffect(() => {
        if (displayFollow && (window as any).streamAlert) {
            (window as any).streamAlert.setName(displayFollow.name);
            (window as any).streamAlert.activate();
            setTimeout(() => {
                (window as any).streamAlert.activate();
                setCurrentFollows((prev) => {
                    console.log({here3: prev});
                    return prev.slice(1);
                });
                setDisplayFollow(undefined);
            }, 6000);
        } else if (!displayFollow && currentFollows.length > 0) {
            console.log(`Adding new follow to display`);
            console.log({here1: currentFollows});
            setDisplayFollow(currentFollows[0]);
        }
    }, [displayFollow]);

    return <React.Fragment>
        <AnimateCC
            animationName="followeralert"
            getAnimationObject={getAnimationObject}
            paused={false}
        />
    </React.Fragment>
}
