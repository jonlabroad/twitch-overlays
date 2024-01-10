import React, { useContext, useEffect, useRef, useState } from "react"
import { AnimateCC, GetAnimationObjectParameter } from "react-adobe-animate"
import { useSonglistControl } from "../../hooks/songlistControlHooks";
import { SongListStateContext } from "../StreamerSongListContainer";

const delay = 1.5;

function isOriginal(currentListSongRef: any) {
    return currentListSongRef.current && (currentListSongRef.current.artist === "Hoagie Man" || currentListSongRef.current.artist.toLowerCase().includes("the songery"));
}

export interface TheSongeryOriginalMusicRavenProps {
}

export const TheSongeryOriginalMusicRaven = (props: TheSongeryOriginalMusicRavenProps) => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);

    const [activated, setActivated] = useState(false);

    const songListContext = useContext(SongListStateContext);
    const currentListSongRef = useRef(songListContext.state.songQueue?.list[0]?.song);

    const currentListSong = songListContext.state.songQueue?.list[0]?.song;

    console.log("HERE THO?");

    useEffect(() => {
        currentListSongRef.current = currentListSong;
    }, [currentListSong])

    useEffect(() => {
        setTimeout(() => {
            if (!activated && isOriginal(currentListSongRef)) {
                if (animationObject?.initialized) {
                    animationObject.start();
                    setActivated(true);
                }
            }
        }, 1000);

        if (activated && !isOriginal(currentListSongRef)) {
            animationObject.reverse();
            setActivated(false);
        }
    }, [currentListSong, animationObject]);

    return <React.Fragment>
        <AnimateCC
            animationName={"originalMusicRaven"}
            getAnimationObject={getAnimationObject}
            paused={false}
        />
    </React.Fragment>
};