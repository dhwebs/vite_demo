export interface MenuItem {
  value: string;
  label: string;
  icon: string;
  children?: MenuItem[];
}
