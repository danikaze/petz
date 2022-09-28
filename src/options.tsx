import { createRoot } from 'react-dom/client';
import { Settings } from '@components/settings';
import { OptionsPage } from '@components/options-page';

const container = document.createElement('div');
document.body.appendChild(container);

const app = (
  <Settings>
    <OptionsPage />
  </Settings>
);
const root = createRoot(container);
root.render(app);
