import { assets } from '@game/assets';
import { GameScene, GameSceneConfig } from '.';

type BackgroundSceneConfig = Pick<GameSceneConfig, 'active' | 'parent'>;

export class BackgroundScene extends GameScene {
  constructor(config: BackgroundSceneConfig) {
    super({
      key: 'BackgroundScene',
      ...config,
    });
  }

  preload() {
    this.preloadAssets({ images: ['bg'] });
  }

  create() {
    const bgImage = this.add.image(0, 0, assets.bg.key);
    this.cameras.main.startFollow(bgImage);
    this.scene.launch('TestScene');
  }

  update() {
    // manual control of bg scaling to cover the canvas
    const bgWidth = 2296;
    const bgHeight = 2532;

    const { clientWidth, clientHeight } = this.parent;

    // max -> cover
    const zoom = Math.max(clientWidth / bgWidth, clientHeight / bgHeight);
    this.cameras.main.setZoom(zoom);
  }
}
