import Phaser from 'phaser';
import { AssetKey, assets } from '@game/assets';

export interface GameSceneConfig extends Phaser.Types.Scenes.SettingsConfig {
  parent: HTMLElement;
}

export interface GameScenePreloadAssets {
  images?: AssetKey<'image'>[];
  atlas?: AssetKey<'atlas'>[];
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

  public preloadAssets(toLoad: GameScenePreloadAssets): void {
    if (toLoad.images) {
      for (const key of toLoad.images) {
        const asset = assets[key];
        this.load.image(asset.key, asset.url);
      }
    }

    if (toLoad.atlas) {
      for (const key of toLoad.atlas) {
        const asset = assets[key];
        this.load.atlas(asset.key, asset.url, asset.json);
      }
    }
  }
}
