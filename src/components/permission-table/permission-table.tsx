// PermissionTable.tsx
import { defineComponent, ref, reactive, watch } from 'vue';
import {
  EnhancedTable as TEnhancedTable,
  Popconfirm as TPopconfirm,
  Button as TButton,
  Checkbox as TCheckbox,
  MessagePlugin,
  Icon as TIcon,
  Dropdown as TDropdown
} from 'tdesign-vue-next';
import type { DropdownOption } from 'tdesign-vue-next';
import _props from './props';
export default defineComponent({
  name: 'HPermissionTable',
  props: _props,
  emits: ['update:visible', 'toggleFullscreen'],
  setup(props, { emit }) {
    const tableRef = ref<any>(null);
    const data = ref(props.data);
    const lazyLoadingData = ref<any>(null);
    const columnController = ref({
      placement: 'top-right',
      fields: ['operate'],
      dialogProps: { preventScrollThrough: true }
    });
    const expandedTreeNodes = ref<any[]>([]);
    const treeConfig = reactive({
      treeNodeColumnIndex: 0,
      indent: 25,
      expandTreeNodeOnClick: true
    });
    let columns = [
      {
        width: 180,
        colKey: 'name',
        title: '名称',
        ellipsis: true
      },
      {
        colKey: 'icon',
        title: '图标',
        width: 100,
        cell: (_: any, { row }: any) => <TIcon name={row.icon} />
      },
      {
        colKey: 'key',
        title: '权限标识',
        width: 100
      },
      {
        colKey: 'link',
        title: '路由',
        width: 100
      },
      {
        colKey: 'type',
        title: '类型',
        width: 100
      },
      {
        colKey: 'operate',
        width: 180,
        title: '操作',
        cell: (_: any, { row }: any) => (
          <div class="tdesign-table-demo__table-operations">
            <TDropdown options={options} trigger="hover" onClick={dropdownChange}>
              <TButton variant="text" theme="primary">
                更多
                <TIcon name="chevron-down" size="16" />
              </TButton>
            </TDropdown>
            <TPopconfirm content="确认删除吗" onConfirm={() => onDeleteConfirm(row)}>
              <t-button variant="text" theme="danger">
                删除
              </t-button>
            </TPopconfirm>
          </div>
        )
      }
    ];
    watch(
      () => props.checkable,
      (newVal) => {
        if (newVal) {
          columns.unshift({
            colKey: 'checkbox',
            title: '选择',
            width: 60,
            cell: (_: any, { row }: any) => <TCheckbox v-model={row.checked} />
          });
          columns = columns.filter((col) => col.colKey !== 'operate');
        } else {
          columns = columns.filter((col) => col.colKey !== 'checkbox');
        }
        treeConfig.treeNodeColumnIndex = newVal ? 1 : 0;
      },
      { immediate: true }
    );
    function onDeleteConfirm(row: any) {
      tableRef.value?.remove(row.key);
      MessagePlugin.success('删除成功');
    }
    function appendTo(row: any) {
      const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      tableRef.value?.appendTo(row.key, {
        id: randomKey1,
        key: 'email',
        name: '电子签署',
        type: 'Number'
      });
      MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 号，请展开查看`);
    }
    function insertBefore(key: any, data: any) {
      tableRef.value?.insertBefore(row.key, data);
    }
    function insertAfter(row: any, data: any) {
      tableRef.value?.insertAfter(row.key, data);
    }
    const options: DropdownOption[] = [
      { value: 'add', content: '添加', prefixIcon: () => <TIcon name="add" /> },
      { value: 'addChildren', content: '添加子项', prefixIcon: () => <TIcon name="add" /> },
      { value: 'edit', content: '编辑', prefixIcon: () => <TIcon name="edit" /> }
    ];
    function dropdownChange(dropdownItem: DropdownOption, context: { e: MouseEvent }) {
      console.log(dropdownItem, context);
    }

    function treeExpandAndFoldIconRender(_: any, { type, row }: any) {
      let icon = '';
      if (lazyLoadingData.value && lazyLoadingData.value.key === row?.key) {
        icon = 'loading';
      } else {
        icon = type === 'expand' ? 'chevron-right' : 'chevron-down';
      }
      return <TIcon name={icon}></TIcon>;
    }
    function getTreeNode() {
      const treeData = tableRef.value?.getTreeNode();
      console.log(treeData);
      MessagePlugin.success('树形结构获取成功，请打开控制台查看');
    }
    function appendToRoot(data: any) {
      tableRef.value?.appendTo('', data);
    }
    function onAbnormalDragSort(params: any) {
      console.log(params);
      if (params.code === 1001) {
        MessagePlugin.warning('不同层级的元素，不允许调整顺序');
      }
    }
    function onExpandedTreeNodesChange(expandedTreeNodes: any, context: any) {
      if (!context.rowState) return;
      onTreeExpandChange(context);
    }
    function onTreeExpandChange(context: any) {
      if (context.row.list === true) {
        lazyLoadingData.value = context.row;
        const timer = setTimeout(() => {
          appendMultipleDataTo(context.row);
          lazyLoadingData.value = null;
          clearTimeout(timer);
        }, 200);
      }
    }
    function onDragSort(params: any) {
      // 可根据需要处理拖拽排序
    }
    function beforeDragSort(params: any) {
      return true;
    }
    return () => (
      <TEnhancedTable
        ref={tableRef}
        v-model:expandedTreeNodes={expandedTreeNodes.value}
        row-key="key"
        drag-sort="row"
        data={data.value}
        columns={columns}
        tree={treeConfig}
        tree-expand-and-fold-icon={treeExpandAndFoldIconRender}
        before-drag-sort={beforeDragSort}
        column-controller={columnController.value}
        onAbnormalDragSort={onAbnormalDragSort}
        onDragSort={onDragSort}
      />
    );
  }
});
