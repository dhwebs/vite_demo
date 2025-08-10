import type { App } from 'vue';
import PermissionTable from './permission-table';

import './style';

PermissionTable.install = (app: App) => {
  app.component(PermissionTable.name!, PermissionTable);
};

export default PermissionTable;
