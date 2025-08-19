import type { App } from 'vue';
import RenderForm from './render-form.vue';

RenderForm.install = (app: App) => {
  app.component(RenderForm.name!, RenderForm);
};

export default RenderForm;
