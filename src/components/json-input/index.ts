import type { App } from 'vue';
import JsonInput from './json-input';
import './style';

JsonInput.install = (app: App) => {
  app.component(JsonInput.name!, JsonInput);
};

export default JsonInput;
