import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app';

const container = document.createElement('div');
document.body.appendChild(container);

const app = <App />;
const root = createRoot(container);
root.render(app);
