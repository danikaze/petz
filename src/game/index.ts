import Phaser from 'phaser';

import sky from '@game-assets/sky.png';
import ground from '@game-assets/platform.png';
import star from '@game-assets/star.png';
import dude from '@game-assets/dude.png';

export interface MainGameOptions {
  parent: HTMLElement;
}

let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
      width: 300,
      height: 300,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: MainGame.preload,
        create: MainGame.create,
        update: MainGame.update,
      },
    };

    this.game = new Phaser.Game(config);
  }

  private static preload(this: Phaser.Scene) {
    this.load.image('sky', chrome.runtime.getURL(sky));
    this.load.image('ground', chrome.runtime.getURL(ground));
    this.load.image('star', chrome.runtime.getURL(star));
    this.load.spritesheet('dude', chrome.runtime.getURL(dude), {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  private static create(this: Phaser.Scene) {
    this.add.image(150, 150, 'sky');
    this.add.image(50, 50, 'star');
    this.add.image(100, 50, 'star');

    const platforms = this.physics.add.staticGroup();
    platforms.create(50, 100, 'ground');
    platforms.create(250, 200, 'ground');
    platforms.create(200, 310, 'ground').setScale(2).refreshBody();

    player = this.physics.add.sprite(30, 200, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, platforms);
  }

  private static update(this: Phaser.Scene) {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left');
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right');
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-250);
    }
  }
}
