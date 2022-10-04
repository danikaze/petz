import { AssetKey, assets } from '@game/assets';
import { AnimatedSprite } from '@game/entities/animated-sprite';
import type { GameScene } from '@game/scenes';

export interface PetConfig {
  name: string;
  atlas: AssetKey<'atlas'>;
}

export type PetAnimation = typeof Pet['animations'][number];

export class Pet extends AnimatedSprite {
  public static readonly animations = ['idle', 'cry', 'happy', 'eat'] as const;

  private petName: string;
  private atlasKey: AssetKey<'atlas'>;
  private currentAnimation: PetAnimation = 'idle';
  private animations: Record<PetAnimation, string>;

  public constructor(scene: GameScene, config: PetConfig) {
    super(scene);

    this.petName = config.name;
    this.atlasKey = config.atlas;

    this.animations = Pet.animations.reduce((res, key) => {
      const animName = `pet_${config.name.toLowerCase()}_${key}`;
      res[key] = animName;
      return res;
    }, {} as Record<PetAnimation, string>);
  }

  public preload(): void {
    this.scene.preloadAssets({
      atlas: [this.atlasKey],
    });
  }

  public create(): void {
    Object.entries(this.animations).forEach(([key, animName]) => {
      this.scene.anims.create({
        key: animName,
        frameRate: 2,
        repeat: -1,
        frames: AnimatedSprite.getFrames({
          scene: this.scene,
          atlasKey: this.atlasKey,
          prefix: `${key}_`,
        }),
      });
    });

    const sprite = this.scene.add.sprite(0, 0, undefined as unknown as string);
    this.setSprite(sprite);
  }

  public destroy(): void {
    Object.values(this.animations).forEach(this.scene.anims.remove);
    this.scene.textures.remove(this.atlasKey);
  }

  public playAnimation(animation: PetAnimation): void {
    this.sprite!.play(this.animations[animation]);
    this.currentAnimation = animation;
  }

  public getAnimation(): PetAnimation {
    return this.currentAnimation;
  }
}
