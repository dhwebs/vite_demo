import { defineComponent, ref, watch } from 'vue';
import {
  Icon as TIcon,
  Button as TButton,
  Avatar as TAvatar,
  Dropdown as TDropdown
} from 'tdesign-vue-next';
import type { DropdownOption } from 'tdesign-vue-next';
import Menu from '../menu';
import Content from '../content';
// import type { MenuItem } from './types';
import _props from './props';

export default defineComponent({
  name: 'HLayout',

  props: _props,

  emits: ['update:collapsed'],

  setup(props, { slots, emit }) {
    const contentFullscreen = ref(false);
    // 公共部分抽离
    function renderFooter(position: 'layout-end' | 'content-end') {
      if (props.footerPosition !== position || contentFullscreen.value) return null;
      if (slots.footer) {
        return <footer class="t-layout__footer">{slots.footer()}</footer>;
      }
      return null;
    }
    function fullscreenChange(val: boolean) {
      contentFullscreen.value = val;
    }
    function renderContent() {
      return (
        <main class={'h-design-layout-content' + (contentFullscreen.value ? ' fullscreen' : '')}>
          <Content {...props.contentProps} onUpdate:fullscreen={fullscreenChange}></Content>
          {renderFooter('content-end')}
        </main>
      );
    }
    function dropdownChange(value: DropdownOption) {
      value.clickFn?.();
    }
    function renderHeader() {
      return (
        !contentFullscreen.value && (
          <header class="h-design-layout-header">
            {slots.logo ? slots.logo() : 'HDesign-vue-next Demo'}
            {props.theme === 'header-menu' && (
              <Menu {...props.menuProps} menuPosition="header"></Menu>
            )}
            {slots.headerMenu && slots.headerMenu()}
            <div class={'h-design-layout-header-actions'}>
              {slots.actions && slots.actions()}
              <TDropdown options={props.userOptions} onClick={dropdownChange}>
                <TButton variant="text">
                  {slots.user ? (
                    slots.user()
                  ) : (
                    <span>
                      <TAvatar size="small">user</TAvatar>user Name
                    </span>
                  )}
                </TButton>
              </TDropdown>
            </div>
          </header>
        )
      );
    }
    function renderAside() {
      return (
        !contentFullscreen.value && (
          <aside class="h-design-layout-asider">
            <Menu {...props.menuProps}></Menu>
          </aside>
        )
      );
    }
    return () => {
      if (props.theme === 'aside-menu') {
        return (
          <section class="h-design-layout">
            {renderHeader()}
            <section class="h-design-layout h-design-layout--with-sider">
              {renderAside()}
              {renderContent()}
            </section>
            {renderFooter('layout-end')}
          </section>
        );
      }
      if (props.theme === 'header-menu') {
        return (
          <section class="h-design-layout">
            {renderHeader()}
            {renderContent()}
            {renderFooter('layout-end')}
          </section>
        );
      }
      // no-header
      return (
        <section class="h-design-layout">
          <section class="h-design-layout h-design-layout--with-sider">
            {renderAside()}
            {renderContent()}
          </section>
          {renderFooter('layout-end')}
        </section>
      );
    };
  }
});
