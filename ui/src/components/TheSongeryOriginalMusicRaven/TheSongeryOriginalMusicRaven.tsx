import React, { useContext, useEffect, useRef, useState } from "react";
import { SongListStateContext } from "../StreamerSongListContainer";
import { 
  PixiSpritesheetAnimation, 
  PixiAnimationController 
} from "./PixiSpritesheetAnimation";

function isOriginal(currentListSongRef: any) {
  return (
    currentListSongRef.current &&
    (currentListSongRef.current.artist === "Hoagie Man" ||
      currentListSongRef.current.artist.toLowerCase().includes("the songery"))
  );
}

const spritesheetPattern = "TheSongeryOriginalMusicNormal-{n}.json";
const spritesheetCount = 5;
const spritesheetFiles = Array.from({ length: spritesheetCount }, (_, i) =>
  spritesheetPattern.replace("{n}", String(i))
);

// Animation configuration
const animationConfig = {
  path: "images/originalMusicRaven",
  spritesheetFiles,
  totalFrames: 1000,
  fps: 60,
  loop: false,
};

export interface IProps {}

export const TheSongeryOriginalMusicRaven = (props: IProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<PixiSpritesheetAnimation | null>(null);
  const [animationController, setAnimationController] =
    useState<PixiAnimationController | null>(null);

  const [activated, setActivated] = useState(false);

  const songListContext = useContext(SongListStateContext);
  const currentListSongRef = useRef(
    songListContext.state.songQueue?.list[0]?.song,
  );

  const currentListSong = songListContext.state.songQueue?.list[0]?.song;

  // Initialize PixiJS Animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const containerElement = canvasRef.current;

    const initAnimation = async () => {
      // Create animation instance
      const animation = new PixiSpritesheetAnimation(animationConfig);

      animationRef.current = animation;

      // Initialize and get controller
      const controller = await animation.initialize(containerElement);
      setAnimationController(controller);

      // Expose to window for external control (e.g., WebSocket)
      (window as any).ravenAnimationController = controller;
    };

    initAnimation();

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    currentListSongRef.current = currentListSong;
  }, [currentListSong]);

  useEffect(() => {
    setTimeout(() => {
      if (!activated && isOriginal(currentListSongRef)) {
        if (animationController?.initialized) {
          animationController.setFrame(0);
          animationController.playToFrame(726);
          setActivated(true);
        }
      }
    }, 1000);

    if (activated && !isOriginal(currentListSongRef)) {
      if (animationController) {
        animationController.setFrame(727);
        animationController.play();
        setActivated(false);
      }
    }
  }, [currentListSong, animationController, activated]);

  return <div ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};
