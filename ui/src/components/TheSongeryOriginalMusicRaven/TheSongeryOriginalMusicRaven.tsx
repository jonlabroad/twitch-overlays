import React, { useContext, useEffect, useRef, useState } from "react";
import { SongListStateContext } from "../StreamerSongListContainer";
import * as PIXI from "pixi.js";

function isOriginal(currentListSongRef: any) {
  return (
    currentListSongRef.current &&
    (currentListSongRef.current.artist === "Hoagie Man" ||
      currentListSongRef.current.artist.toLowerCase().includes("the songery"))
  );
}

// Default atlas URLs - defined outside component to prevent re-creation
const DEFAULT_ATLAS_URLS = [
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-0.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-1.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-2.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-3.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-4.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-5.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-6.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-7.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-8.json",
  "images/originalMusicRavenUnadobed/TheSongeryOriginalMusic-9.json",
];

interface PixiAnimationController {
  initialized: boolean;
  start: () => void;
  continue: () => void;
  pause: () => void;
  setFrame: (frameNumber: number) => void;
  stepForward: () => void;
  stepBack: () => void;
  play: () => void;
  playToFrame: (targetFrame: number) => void;
}

export interface IProps {
  atlasUrls?: string[]; // Array of atlas JSON URLs
  totalFrames?: number; // Total number of frames (default: 1000)
}

const fps60Speed = 1.0;

export const TheSongeryOriginalMusicRaven = (props: IProps) => {
  const {
    atlasUrls = DEFAULT_ATLAS_URLS,
    totalFrames = 1000,
  } = props;

  const canvasRef = useRef<HTMLDivElement>(null);
  const pixiAppRef = useRef<PIXI.Application | null>(null);
  const animatedSpriteRef = useRef<PIXI.AnimatedSprite | null>(null);
  const [animationController, setAnimationController] =
    useState<PixiAnimationController | null>(null);

  const [activated, setActivated] = useState(false);

  const songListContext = useContext(SongListStateContext);
  const currentListSongRef = useRef(
    songListContext.state.songQueue?.list[0]?.song,
  );

  const currentListSong = songListContext.state.songQueue?.list[0]?.song;

  // Initialize PixiJS
  useEffect(() => {
    if (!canvasRef.current) return;

    const containerElement = canvasRef.current;

    const initPixi = async () => {
      // Get container dimensions
      const containerWidth = containerElement.clientWidth || 1920;
      const containerHeight = containerElement.clientHeight || 1080;

      // Create PixiJS application
      const app = new PIXI.Application();
      await app.init({
        width: containerWidth,
        height: containerHeight,
        backgroundColor: 0x000000,
        backgroundAlpha: 0,
        resizeTo: containerElement, // Auto-resize to container
      });

      containerElement.appendChild(app.canvas as HTMLCanvasElement);
      pixiAppRef.current = app;

      // Load all atlas files as spritesheets
      const loadedSpritesheets: any[] = [];
      for (const url of atlasUrls) {
        const spritesheet = await PIXI.Assets.load(url);
        loadedSpritesheets.push(spritesheet);
      }

      // Collect all frame names from all spritesheets
      const allFrameNames: string[] = [];
      for (const sheet of loadedSpritesheets) {
        if (sheet.textures) {
          allFrameNames.push(...Object.keys(sheet.textures));
        }
      }

      // Sort frame names numerically by extracting the number
      const sortedFrameNames = allFrameNames
        .filter(
          (name) =>
            name.startsWith("TheSongeryOriginalMusic") && name.endsWith(".png"),
        )
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0] || "0");
          const numB = parseInt(b.match(/\d+/)?.[0] || "0");
          return numA - numB;
        });

      // Build frames array in sorted order
      const frames: PIXI.Texture[] = [];
      for (const frameName of sortedFrameNames) {
        // Find the texture in the loaded spritesheets
        for (const sheet of loadedSpritesheets) {
          if (sheet.textures && sheet.textures[frameName]) {
            frames.push(sheet.textures[frameName]);
            break;
          }
        }
      }

      if (frames.length === 0) {
        console.error(
          "No valid frames loaded! Check atlas URLs and frame naming.",
        );
        return;
      }

      console.log(`Successfully loaded ${frames.length} frames for animation`);

      // Create AnimatedSprite with manual control
      const animatedSprite = new PIXI.AnimatedSprite(frames);
      animatedSprite.animationSpeed = fps60Speed;
      animatedSprite.loop = false;
      animatedSprite.currentFrame = 0;
      animatedSprite.stop(); // Start stopped

      // Function to resize sprite to fit container while maintaining aspect ratio
      const resizeSprite = () => {
        const currentWidth = app.screen.width;
        const currentHeight = app.screen.height;
        
        // Calculate scale to fit width while maintaining aspect ratio
        const scaleX = currentWidth / animatedSprite.texture.width;
        const scaleY = currentHeight / animatedSprite.texture.height;
        const scale = Math.min(scaleX, scaleY);
        
        animatedSprite.scale.set(scale);
        
        // Position at top-left (origin)
        animatedSprite.x = 0;
        animatedSprite.y = 0;
        animatedSprite.anchor.set(0, 0);
      };

      // Initial sizing
      resizeSprite();

      app.stage.addChild(animatedSprite);
      animatedSpriteRef.current = animatedSprite;

      // Listen for resize events
      app.renderer.on('resize', resizeSprite);

      // Frame monitoring for playToFrame functionality
      let targetStopFrame: number | null = null;
      const onFrameChange = () => {
        if (
          targetStopFrame !== null &&
          animatedSprite.currentFrame >= targetStopFrame
        ) {
          animatedSprite.stop();
          targetStopFrame = null;
        }
      };
      animatedSprite.onFrameChange = onFrameChange;

      // Create controller API
      const controller: PixiAnimationController = {
        initialized: true,
        start: () => {
          console.log("Starting animation from frame 0");
          if (animatedSprite) {
            targetStopFrame = null; // Clear any previous stop target
            animatedSprite.gotoAndPlay(0);
          }
        },
        continue: () => {
          console.log("Continuing animation from current frame");
          if (animatedSprite) {
            targetStopFrame = null; // Clear any previous stop target
            animatedSprite.play();
          }
        },
        pause: () => {
          console.log("Pausing animation");
          if (animatedSprite) {
            targetStopFrame = null;
            animatedSprite.stop();
          }
        },
        setFrame: (frameNumber: number) => {
          if (animatedSprite && frameNumber >= 0 && frameNumber < totalFrames) {
            animatedSprite.gotoAndStop(frameNumber);
          }
        },
        stepForward: () => {
          if (animatedSprite) {
            const nextFrame = Math.min(
              animatedSprite.currentFrame + 1,
              totalFrames - 1,
            );
            animatedSprite.gotoAndStop(nextFrame);
          }
        },
        stepBack: () => {
          if (animatedSprite) {
            const prevFrame = Math.max(animatedSprite.currentFrame - 1, 0);
            animatedSprite.gotoAndStop(prevFrame);
          }
        },
        play: () => {
          if (animatedSprite) {
            targetStopFrame = null;
            animatedSprite.play();
          }
        },
        playToFrame: (targetFrame: number) => {
          console.log(`Playing to frame ${targetFrame}`);
          if (
            animatedSprite &&
            targetFrame >= 0 &&
            targetFrame < frames.length
          ) {
            targetStopFrame = targetFrame;
            animatedSprite.play();
          }
        },
      };

      setAnimationController(controller);

      // Expose to window for external control (e.g., WebSocket)
      (window as any).ravenAnimationController = controller;
    };

    initPixi();

    // Cleanup
    return () => {
      if (pixiAppRef.current) {
        pixiAppRef.current.destroy(true, { children: true });
        pixiAppRef.current = null;
      }
      if (containerElement?.firstChild) {
        containerElement.removeChild(containerElement.firstChild);
      }
    };
  }, [atlasUrls, totalFrames]);

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
