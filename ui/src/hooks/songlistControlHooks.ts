import { useEffect, useRef, useState } from "react";
import { SongInfo } from "../service/StreamerSongListClient";

export const useSonglistControl = (animationObject: any, currentListSong: SongInfo | undefined, baseDelaySec: number) => {
    const [activated, setActivated] = useState(false);

    const [currentSong, setCurrentSong] = useState<SongInfo | undefined>(currentListSong);
    const [nextSong, setNextSong] = useState<SongInfo | undefined>(undefined);
    const nextSongRef = useRef<SongInfo | undefined>(undefined);    
    
    const animationObjectRef = useRef(animationObject);

    if (currentSong) {
        animationObject.instance.ArtistName.text = currentSong.artist;
        animationObject.instance.SongName.text = currentSong.title;
    }

    useEffect(() => {
        animationObjectRef.current = animationObject;
    }, [animationObject]);

    useEffect(() => {
        nextSongRef.current = nextSong;
    }, [nextSong]);

    useEffect(() => {
        setNextSong(currentListSong);
        if (!activated) {
            setTimeout(() => {
                if (currentListSong === nextSongRef.current) {
                    setCurrentSong(currentListSong);
                }
            }, baseDelaySec * 1 * 1e3);
        } else {
            setTimeout(() => {
                if (currentListSong === nextSongRef.current) {
                    setCurrentSong(currentListSong);
                }
            }, baseDelaySec * 1 * 1e3);
        }
    }, [currentListSong]);

    useEffect(() => {
        console.log({initialized: animationObject?.initialized, currentSong, activated})
        if (animationObject?.initialized) {
            if (nextSong) {
                if (activated) {
                    // There is a current song, gotta slide out then wait to slide in again
                    console.log("slideout");
                    animationObjectRef?.current.slideOut();
                    setActivated(false);
                    setTimeout(() => {
                        console.log("slidein");
                        setActivated(true);
                        animationObjectRef?.current.slideIn();
                        animationObjectRef?.current.slideIn();
                    }, baseDelaySec * 2 * 1e3);
                } else {
                    console.log("slidein");
                    setActivated(true);
                    animationObjectRef?.current.slideIn();
                }
            }
        }
    }, [nextSong, animationObject?.initialized]);
}