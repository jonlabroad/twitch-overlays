import React, { useContext, useEffect, useRef, useState } from "react"
import AnimateCC, { GetAnimationObjectParameter } from "react-adobe-animate"
import { useSonglistControl } from "../../hooks/songlistControlHooks";
import { SongInfo } from "../../service/StreamerSongListClient";
import { SongListStateContext } from "../StreamerSongListContainer";

const delay = 1.5;

export interface CurrentSongeryProps {
}

export const CurrentSongery = (props: CurrentSongeryProps) => {
    const [animationObject, getAnimationObject] = useState<GetAnimationObjectParameter | null>(null);

    const songListContext = useContext(SongListStateContext);
    const currentListSong = songListContext.state.songQueue?.list[0].song;

    useSonglistControl(animationObject, currentListSong, delay);

    return <React.Fragment>
        <AnimateCC
            animationName="testnotification"
            getAnimationObject={getAnimationObject}
            paused={false}
        />
    </React.Fragment>
};