import { MainGame } from '@game';
import { getLogger } from '@src/utils/logger';
import { useCallbackRef } from '@src/utils/use-callback-ref';

const logger = getLogger('Game');

export function useGame() {
  const refs = {
    parent: useCallbackRef<HTMLDivElement>(null, initGame),
  };

  function initGame(parent: HTMLDivElement | null) {
    if (!parent) return;
    logger.info('Initializing game...');
    const game = new MainGame({ parent });
    game.setup();
    logger.info('Game initialized', game);
  }

  return {
    refs,
  };
}
