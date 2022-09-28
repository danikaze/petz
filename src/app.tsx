window.global = globalThis;

/*
 * Using `require` (vs `import`) because order matters,
 * to define window.global BEFORE phaser gets imported
 */
const { createRoot } = require('react-dom/client');
const { App } = require('@components/app');
const { Settings } = require('@components/settings');

const container = document.createElement('div');
document.body.appendChild(container);

const app = (
  <Settings>
    <App />
  </Settings>
);
const root = createRoot(container);
root.render(app);
