import Phaser from 'phaser';
import { BackgroundScene } from './scenes/background';
import { PetScene } from './scenes/pet';

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
      scene: [
        new BackgroundScene({ active: true, parent: this.parent }),
        new PetScene({ active: true, parent: this.parent }),
      ],
    };

    this.game = new Phaser.Game(config);
  }
}
