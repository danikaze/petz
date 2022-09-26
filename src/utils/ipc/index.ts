import { SingleMessageIpc } from '../ipc-lib/single';
import { AppMessages } from './msgs';

export const singleIpc = new SingleMessageIpc<AppMessages>();
