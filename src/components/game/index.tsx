import { FC } from 'react';
import { useGame } from './hooks';

import styles from './game.module.scss';

/**
 * Just the HTML render container for the game itself.
 * All the logic and Phaser control is in @src/game
 */
export const Game: FC = () => {
  const { refs } = useGame();

  return <div className={styles.root} ref={refs.parent}></div>;
};
