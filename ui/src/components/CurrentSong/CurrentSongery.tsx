import React, { useContext, useEffect, useRef, useState } from "react"
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate"
import { SongInfo } from "../../service/StreamerSongListClient";
import { SongListStateContext } from "../StreamerSongListContainer";

const delay = 1.5;

export interface CurrentSongeryProps {
}

export const CurrentSongery = (props: CurrentSongeryProps) => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);
    const animationObjectRef = useRef(animationObject);

    const [activated, setActivated] = useState(false);

    const songListContext = useContext(SongListStateContext);
    const currentListSong = songListContext.state.songQueue?.list[0].song;
    const [currentSong, setCurrentSong] = useState<SongInfo | undefined>(currentListSong);
    const [nextSong, setNextSong] = useState<SongInfo | undefined>(undefined);
    const nextSongRef = useRef<SongInfo | undefined>(undefined);    

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
            }, delay * 1 * 1e3);
        } else {
            setTimeout(() => {
                if (currentListSong === nextSongRef.current) {
                    setCurrentSong(currentListSong);
                }
            }, delay * 1 * 1e3);
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
                    }, delay * 2 * 1e3);
                } else {
                    console.log("slidein");
                    setActivated(true);
                    animationObjectRef?.current.slideIn();
                }
            }
        }
    }, [nextSong, animationObject?.initialized]);

    return <React.Fragment>
        <AnimateCC
            animationName="testnotification"
            getAnimationObject={getAnimationObject}
            paused={false}
        />
    </React.Fragment>
};