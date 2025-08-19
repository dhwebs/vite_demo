import type { App } from 'vue';
import SearchForm from './search-form';

SearchForm.install = (app: App) => {
  app.component(SearchForm.name!, SearchForm);
};

export default SearchForm;
