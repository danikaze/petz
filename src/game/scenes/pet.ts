import { Pet } from '@game/pet';
import { GameScene, GameSceneConfig } from '.';

export type PetSceneConfig = Pick<GameSceneConfig, 'active' | 'parent'>;

export class PetScene extends GameScene {
  private pet!: Pet;

  constructor(config: PetSceneConfig) {
    super({
      key: 'PetScene',
      ...config,
    });

    this.pet = new Pet(this, {
      name: 'Baby',
      atlas: 'baby',
    });
  }

  preload() {
    this.pet.preload();
  }

  create() {
    this.pet.create();
    this.pet.playAnimation('idle');
    this.cameras.main.startFollow(this.pet.sprite!);

    const cycleAnim = () => {
      const current = Pet.animations.indexOf(this.pet.getAnimation());
      const next = Pet.animations[(current + 1) % Pet.animations.length];
      this.pet.playAnimation(next);
    };

    const hatchEgg = () => {
      document.removeEventListener('click', hatchEgg);
      document.addEventListener('click', cycleAnim);
    };

    document.addEventListener('click', hatchEgg);
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
