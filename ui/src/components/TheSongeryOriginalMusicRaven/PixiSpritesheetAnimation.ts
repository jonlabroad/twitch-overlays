import * as PIXI from "pixi.js";

export interface PixiSpritesheetAnimationConfig {
  /** Path to the folder containing spritesheet files */
  path: string;
  /** Filename pattern with {n} as placeholder for number (e.g., 'sprite-{n}.json') */
  filePattern: string;
  /** Frames per second for the animation (default: 60) */
  fps?: number;
  /** Whether the animation should loop (default: false) */
  loop?: boolean;
  /** Total number of frames in the animation (default: 1000) */
  totalFrames?: number;
  /** Background color (default: 0x000000) */
  backgroundColor?: number;
  /** Background alpha/transparency (default: 0) */
  backgroundAlpha?: number;
}

export interface PixiAnimationController {
  initialized: boolean;
  start: () => void;
  continue: () => void;
  pause: () => void;
  setFrame: (frameNumber: number) => void;
  stepForward: () => void;
  stepBack: () => void;
  play: () => void;
  playToFrame: (targetFrame: number) => void;
  getCurrentFrame: () => number;
  isPlaying: () => boolean;
  destroy: () => void;
}

export class PixiSpritesheetAnimation {
  private config: Required<PixiSpritesheetAnimationConfig>;
  private app: PIXI.Application | null = null;
  private animatedSprite: PIXI.AnimatedSprite | null = null;
  private container: HTMLElement | null = null;
  private targetStopFrame: number | null = null;
  private frames: PIXI.Texture[] = [];
  private resizeHandler: (() => void) | null = null;

  constructor(config: PixiSpritesheetAnimationConfig) {
    // Set defaults
    this.config = {
      ...config,
      fps: config.fps ?? 60,
      loop: config.loop ?? false,
      totalFrames: config.totalFrames ?? 1000,
      backgroundColor: config.backgroundColor ?? 0x000000,
      backgroundAlpha: config.backgroundAlpha ?? 0,
    };
  }

  /**
   * Initialize the PixiJS application and load spritesheets
   */
  async initialize(containerElement: HTMLElement): Promise<PixiAnimationController> {
    this.container = containerElement;

    // Get container dimensions
    const containerWidth = containerElement.clientWidth || 1920;
    const containerHeight = containerElement.clientHeight || 1080;

    // Create PixiJS application
    const app = new PIXI.Application();
    await app.init({
      width: containerWidth,
      height: containerHeight,
      backgroundColor: this.config.backgroundColor,
      backgroundAlpha: this.config.backgroundAlpha,
      resizeTo: containerElement,
    });

    containerElement.appendChild(app.canvas as HTMLCanvasElement);
    this.app = app;

    // Auto-discover spritesheet files by trying to load sequentially numbered files
    const loadedSpritesheets: any[] = [];
    let fileIndex = 0;
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 3; // Stop after 3 consecutive failures

    while (consecutiveFailures < maxConsecutiveFailures) {
      const filename = this.config.filePattern.replace("{n}", String(fileIndex));
      const url = `${this.config.path}/${filename}`;
      
      try {
        const spritesheet = await PIXI.Assets.load(url);
        loadedSpritesheets.push(spritesheet);
        consecutiveFailures = 0; // Reset on success
        fileIndex++;
      } catch (error) {
        console.log(`Failed to load ${url}, trying next...`);
        consecutiveFailures++;
        fileIndex++;
      }
    }

    if (loadedSpritesheets.length === 0) {
      throw new Error(
        `No spritesheet files found at ${this.config.path} with pattern ${this.config.filePattern}`
      );
    }

    console.log(`Loaded ${loadedSpritesheets.length} spritesheet files`);

    // Collect all frame names from all spritesheets
    const allFrameNames: string[] = [];
    for (const sheet of loadedSpritesheets) {
      if (sheet.textures) {
        allFrameNames.push(...Object.keys(sheet.textures));
      }
    }

    // Sort frame names numerically by extracting the number
    const sortedFrameNames = allFrameNames.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");
      return numA - numB;
    });

    // Build frames array in sorted order
    this.frames = [];
    for (const frameName of sortedFrameNames) {
      // Find the texture in the loaded spritesheets
      for (const sheet of loadedSpritesheets) {
        if (sheet.textures && sheet.textures[frameName]) {
          this.frames.push(sheet.textures[frameName]);
          break;
        }
      }
    }

    if (this.frames.length === 0) {
      throw new Error(
        "No valid frames loaded! Check atlas URLs and frame naming."
      );
    }

    console.log(`Successfully loaded ${this.frames.length} frames for animation`);

    // Create AnimatedSprite with manual control
    const animatedSprite = new PIXI.AnimatedSprite(this.frames);
    
    // Convert FPS to animation speed (PixiJS uses speed relative to 60fps)
    animatedSprite.animationSpeed = this.config.fps / 60;
    animatedSprite.loop = this.config.loop;
    animatedSprite.currentFrame = 0;
    animatedSprite.stop(); // Start stopped

    // Function to resize sprite to fit container while maintaining aspect ratio
    this.resizeHandler = () => {
      if (!this.app || !animatedSprite) return;
      
      const currentWidth = this.app.screen.width;
      const currentHeight = this.app.screen.height;

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
    this.resizeHandler();

    app.stage.addChild(animatedSprite);
    this.animatedSprite = animatedSprite;

    // Listen for resize events
    app.renderer.on("resize", this.resizeHandler);

    // Frame monitoring for playToFrame functionality
    const onFrameChange = () => {
      if (
        this.targetStopFrame !== null &&
        animatedSprite.currentFrame >= this.targetStopFrame
      ) {
        animatedSprite.stop();
        this.targetStopFrame = null;
      }
    };
    animatedSprite.onFrameChange = onFrameChange;

    this.animatedSprite = animatedSprite;

    // Return controller API
    return this.getController();
  }

  /**
   * Get the animation controller interface
   */
  private getController(): PixiAnimationController {
    return {
      initialized: true,
      start: () => {
        console.log("Starting animation from frame 0");
        if (this.animatedSprite) {
          this.targetStopFrame = null;
          this.animatedSprite.gotoAndPlay(0);
        }
      },
      continue: () => {
        console.log("Continuing animation from current frame");
        if (this.animatedSprite) {
          this.targetStopFrame = null;
          this.animatedSprite.play();
        }
      },
      pause: () => {
        console.log("Pausing animation");
        if (this.animatedSprite) {
          this.targetStopFrame = null;
          this.animatedSprite.stop();
        }
      },
      setFrame: (frameNumber: number) => {
        if (
          this.animatedSprite &&
          frameNumber >= 0 &&
          frameNumber < this.config.totalFrames
        ) {
          this.animatedSprite.gotoAndStop(frameNumber);
        }
      },
      stepForward: () => {
        if (this.animatedSprite) {
          const nextFrame = Math.min(
            this.animatedSprite.currentFrame + 1,
            this.config.totalFrames - 1
          );
          this.animatedSprite.gotoAndStop(nextFrame);
        }
      },
      stepBack: () => {
        if (this.animatedSprite) {
          const prevFrame = Math.max(this.animatedSprite.currentFrame - 1, 0);
          this.animatedSprite.gotoAndStop(prevFrame);
        }
      },
      play: () => {
        if (this.animatedSprite) {
          this.targetStopFrame = null;
          this.animatedSprite.play();
        }
      },
      playToFrame: (targetFrame: number) => {
        console.log(`Playing to frame ${targetFrame}`);
        if (
          this.animatedSprite &&
          targetFrame >= 0 &&
          targetFrame < this.frames.length
        ) {
          this.targetStopFrame = targetFrame;
          this.animatedSprite.play();
        }
      },
      getCurrentFrame: () => {
        return this.animatedSprite?.currentFrame ?? 0;
      },
      isPlaying: () => {
        return this.animatedSprite?.playing ?? false;
      },
      destroy: () => {
        this.destroy();
      },
    };
  }

  /**
   * Destroy the PixiJS application and clean up resources
   */
  destroy(): void {
    if (this.resizeHandler && this.app) {
      this.app.renderer.off("resize", this.resizeHandler);
      this.resizeHandler = null;
    }

    if (this.app) {
      this.app.destroy(true, { children: true });
      this.app = null;
    }

    if (this.container?.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    this.animatedSprite = null;
    this.container = null;
    this.frames = [];
    this.targetStopFrame = null;
  }
}
