import { createRoot } from 'react-dom/client';
import { App } from '@components/app';
import { Settings } from '@components/settings';

const container = document.createElement('div');
document.body.appendChild(container);

const app = (
  <Settings>
    <App />
  </Settings>
);
const root = createRoot(container);
root.render(app);
