import { useEffect, useState } from 'react';
import { MainGame } from '@game';
import { getLogger } from '@src/utils/logger';
import { useCallbackRef } from '@src/utils/use-callback-ref';

const logger = getLogger('Game');

interface State {
  html: HTMLHtmlElement;
  canvas: HTMLCanvasElement;
  mainGame: MainGame;
}

export function useGame() {
  const [state, setState] = useState<State | undefined>();
  const refs = {
    parent: useCallbackRef<HTMLDivElement>(null, initGame),
  };

  useEffect(() => {
    if (!state) return;
    window.addEventListener('resize', resizeCanvas);
    return destroy;
  }, [state]);

  function initGame(parent: HTMLDivElement | null) {
    if (!parent) return;
    logger.info('Initializing game...');
    const game = new MainGame({ parent });
    game.setup();
    logger.info('Game initialized', game);

    const html = document.querySelector('html');
    const canvas = parent.querySelector('canvas');

    if (!html || !canvas) {
      throw new Error('Something went wrong with the canvas');
    }

    setState({
      html,
      canvas,
      mainGame: game,
    });
  }

  function resizeCanvas(): void {
    if (!state) return;
    const { mainGame, html } = state;

    mainGame.game.scale.resize(html.clientWidth, html.clientHeight);
  }

  function destroy() {
    window.removeEventListener('resize', resizeCanvas);
  }

  return {
    refs,
  };
}
