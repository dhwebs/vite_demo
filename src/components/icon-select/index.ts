import type { App } from 'vue';
import IconSelect from './icon-select';

import './style';

IconSelect.install = (app: App) => {
  app.component(IconSelect.name!, IconSelect);
};

export default IconSelect;
