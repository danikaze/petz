import Phaser from 'phaser';
import { assets } from './assets';

export interface MainGameOptions {
  parent: HTMLElement;
}

export class MainGame {
  public game!: Phaser.Game;
  private parent: HTMLElement;

  constructor(data: MainGameOptions) {
    this.parent = data.parent;
  }

  public setup() {
    const config: Phaser.Types.Core.GameConfig = {
      parent: this.parent,
      type: Phaser.AUTO,
      width: this.parent.clientWidth,
      height: this.parent.clientHeight,
      scene: [getBackgroundScene(this.parent), getPetScene(this.parent)],
    };

    this.game = new Phaser.Game(config);
  }
}

function getBackgroundScene(parent: HTMLElement) {
  let bgImage;
  return {
    key: 'scene-bg',
    active: true,
    pack: {
      files: [assets.bg],
    },

    create(this: Phaser.Scene) {
      bgImage = this.add.image(0, 0, assets.bg.key);
      this.cameras.main.startFollow(bgImage);
    },

    update(this: Phaser.Scene) {
      // manual control of bg scaling to cover the canvas
      const bgWidth = 2296;
      const bgHeight = 2532;

      const { clientWidth, clientHeight } = parent;

      // max -> cover
      const zoom = Math.max(clientWidth / bgWidth, clientHeight / bgHeight);
      this.cameras.main.setZoom(zoom);
    },
  };
}

function getPetScene(parent: HTMLElement) {
  return {
    key: 'scene-pet',
    active: true,
    pack: {
      files: [assets.pet],
    },

    create(this: Phaser.Scene) {
      const pet = this.add.image(0, 0, assets.pet.key);

      const mainCamera = this.cameras.main;
      mainCamera.startFollow(pet);
    },

    update(this: Phaser.Scene) {
      // manual control of the pet resize
      const petWidth = 1013; // margin included in the image
      const petHeight = 1101; // sizes of the image

      // button/info zone should be substracted from the clientHeight
      const { clientWidth, clientHeight } = parent;

      // min -> fit
      const zoom = Math.min(clientWidth / petWidth, clientHeight / petHeight);
      this.cameras.main.setZoom(zoom);
    },
  };
}
