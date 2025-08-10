import type { App } from 'vue';
import Dialog from './dialog';

import './style';

Dialog.install = (app: App) => {
  app.component(Dialog.name!, Dialog);
};

export default Dialog;
