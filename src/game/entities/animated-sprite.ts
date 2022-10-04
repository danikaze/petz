import { AssetKey } from '@game/assets';
import type { GameScene } from '@game/scenes';

export interface GetFramesOptions {
  scene: Phaser.Scene;
  atlasKey: AssetKey<'atlas'>;
  prefix: string;
}

export abstract class AnimatedSprite {
  public sprite?: Phaser.GameObjects.Sprite;

  protected readonly scene: GameScene;

  public static getFrames({
    scene,
    atlasKey,
    prefix,
  }: GetFramesOptions): Phaser.Types.Animations.AnimationFrame[] {
    const texture = scene.textures.get(atlasKey);
    if (!texture) {
      throw new Error(`Texture "${atlasKey}" not found.`);
    }

    const frames: Phaser.Types.Animations.AnimationFrame[] = [];
    Object.entries(texture.frames).forEach(([key, frame]) => {
      if (!key.startsWith(prefix)) return;
      frames.push({
        key: atlasKey,
        frame: key,
      });
    });

    frames.sort((a, b) => {
      const na = Number((/(\d+)/.exec(a.frame as string) || [])[0]);
      const nb = Number((/(\d+)/.exec(b.frame as string) || [])[0]);
      return na - nb;
    });

    return frames;
  }

  constructor(scene: GameScene) {
    this.scene = scene;
  }

  /**
   * Code to run when the Scene preloads
   */
  public preload(): void {}

  /**
   * Code to run when the Scene is created
   */
  public create() {}

  /**
   * Code to run when the Scene is destroyed
   */
  public destroy() {}

  protected setSprite(sprite: Phaser.GameObjects.Sprite): void {
    this.sprite = sprite;
  }
}
