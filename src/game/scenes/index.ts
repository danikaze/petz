import Phaser from 'phaser';
import { AssetKey, assets } from '@game/assets';

export interface GameSceneConfig extends Phaser.Types.Scenes.SettingsConfig {
  parent: HTMLElement;
}

export interface GameScenePreloadAssets {
  images: AssetKey<'image'>[];
}

export abstract class GameScene extends Phaser.Scene {
  protected parent: HTMLElement;

  protected constructor({ parent, ...config }: GameSceneConfig) {
    if (!config.key) {
      throw new Error('GameScene without key');
    }
    super(config);
    this.parent = parent;
  }

  protected preloadAssets(toLoad: GameScenePreloadAssets): void {
    for (const key of toLoad.images) {
      const asset = assets[key];
      this.load.image(asset.key, asset.url);
    }
  }
}
