import { getLogger } from '@utils/logger';
import { setupIpcListeners } from './ipc';

const logger = getLogger('bg');

logger.info('worker started');
setupIpcListeners();
