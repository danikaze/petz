import { assets } from '@game/assets';
import { GameScene, GameSceneConfig } from '.';

export type PetSceneConfig = Pick<GameSceneConfig, 'active' | 'parent'>;

export class PetScene extends GameScene {
  constructor(config: PetSceneConfig) {
    super({
      key: 'PetScene',
      ...config,
      pack: {
        files: [assets.pet],
      },
    });
  }

  create() {
    const pet = this.add.image(0, 0, assets.pet.key);
    this.cameras.main.startFollow(pet);
  }

  update() {
    // manual control of the pet resize
    const petWidth = 1013; // margin included in the image
    const petHeight = 1101; // sizes of the image

    // button/info zone should be substracted from the clientHeight
    const { clientWidth, clientHeight } = this.parent;

    // min -> fit
    const zoom = Math.min(clientWidth / petWidth, clientHeight / petHeight);
    this.cameras.main.setZoom(zoom);
  }
}
