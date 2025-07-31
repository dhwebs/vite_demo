export interface MenuItem {
  value: string | number;
  icon?: string;
  title?: string | Function;
  content?: string | Function;
  type?: 'group';
  to?: string;
  href?: string;
  replace?: boolean;
  disabled?: boolean;
  target?: string;
  onClick?: Function;
  children?: MenuItem[];
}
