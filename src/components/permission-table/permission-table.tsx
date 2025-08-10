// PermissionTable.tsx
import { defineComponent, ref, reactive, computed } from 'vue';
import {
  Table as TTable,
  EnhancedTable as TEnhancedTable,
  Link as TLink,
  Popconfirm as TPopconfirm,
  Button as TButton,
  Checkbox as TCheckbox,
  MessagePlugin,
  Loading
} from 'tdesign-vue-next';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MoveIcon,
  AddRectangleIcon,
  MinusRectangleIcon
} from 'tdesign-icons-vue-next';
import _props from './props';

const TOTAL = 5;

function getObject(i: number, currentPage: number) {
  return {
    id: i,
    key: `申请人 ${i}_${currentPage} 号`,
    platform: ['电子签署', '纸质签署', '纸质签署'][i % 3],
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源'
  };
}

function getData(currentPage = 1) {
  const data: any[] = [];
  for (let i = 0; i < TOTAL; i++) {
    const obj = getObject(i, currentPage);
    obj.list = new Array(2).fill(null).map((_, j) => {
      const secondIndex = 100 * j + (i + 1) * 10;
      const secondObj = {
        ...obj,
        id: secondIndex,
        key: `申请人 ${secondIndex}_${currentPage} 号`
      };
      secondObj.list = new Array(3).fill(null).map((_, n) => {
        const thirdIndex = secondIndex * 1000 + 100 * n + (n + 1) * 10;
        return {
          ...obj,
          id: thirdIndex,
          key: `申请人 ${thirdIndex}_${currentPage} 号`,
          list: true
        };
      });
      return secondObj;
    });
    if (i === 0) obj.list = [];
    data.push(obj);
  }
  data.push({
    ...getObject(66666, currentPage),
    list: true,
    key: '申请人懒加载节点 66666，点我体验'
  });
  data.push({
    ...getObject(88888, currentPage),
    list: true,
    key: '申请人懒加载节点 88888，点我体验 '
  });
  return data;
}

export default defineComponent({
  name: 'HPermissionTable',
  props: _props,
  emits: ['update:visible', 'toggleFullscreen'],
  setup(props, { emit }) {
    const tableRef = ref<any>(null);
    const data = ref(getData());
    const lazyLoadingData = ref<any>(null);
    const columnController = ref({
      placement: 'bottom-left',
      fields: ['id', 'platform', 'operate'],
      dialogProps: { preventScrollThrough: true }
    });
    const expandedTreeNodes = ref<any[]>([]);
    const treeConfig = reactive({
      childrenKey: 'list',
      treeNodeColumnIndex: 2,
      indent: 25,
      expandTreeNodeOnClick: true
    });
    const expandAll = ref(false);
    const pagination = reactive({
      current: 1,
      pageSize: TOTAL,
      total: TOTAL
    });
    const customTreeExpandAndFoldIcon = ref(false);

    const resetData = () => {
      data.value = getData();
      expandedTreeNodes.value = [];
    };

    const onEditClick = (row: any) => {
      const newData = {
        ...row,
        platform: 'New',
        type: 'Symbol',
        default: 'undefined'
      };
      tableRef.value?.setData(row.key, newData);
      MessagePlugin.success('数据已更新');
    };

    const onDeleteConfirm = (row: any) => {
      tableRef.value?.remove(row.key);
      MessagePlugin.success('删除成功');
    };

    const onLookUp = (row: any) => {
      const allRowData = tableRef.value?.getData(row.key);
      const message = '当前行全部数据，包含节点路径、父节点、子节点、是否展开、是否禁用等';
      MessagePlugin.success(`打开控制台查看${message}`);
      console.log(`${message}：`, allRowData);
    };

    const appendTo = (row: any) => {
      const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      tableRef.value?.appendTo(row.key, {
        id: randomKey1,
        key: `申请人 ${randomKey1} 号`,
        platform: '电子签署',
        type: 'Number'
      });
      MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 号，请展开查看`);
    };

    function appendMultipleDataTo(row: any) {
      const randomKey1 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      const randomKey2 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      const randomKey3 = Math.round(Math.random() * Math.random() * 1000) + 10000;
      const appendList = [
        {
          id: randomKey1,
          key: `申请人 ${randomKey1} 号`,
          platform: '电子签署',
          type: 'Number'
        },
        {
          id: randomKey2,
          key: `申请人 ${randomKey2} 号`,
          platform: '纸质签署',
          type: 'Number'
        },
        {
          id: randomKey3,
          key: `申请人 ${randomKey3} 号`,
          platform: '纸质签署',
          type: 'Number',
          list: true
        }
      ];
      tableRef.value?.appendTo(row?.key, appendList);
      MessagePlugin.success(`已插入子节点申请人 ${randomKey1} 和 ${randomKey2} 号，请展开查看`);
    }

    const insertBefore = (row: any) => {
      const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
      tableRef.value?.insertBefore(row.key, {
        id: randomKey,
        key: `申请人 ${randomKey} 号`,
        platform: '纸质签署',
        type: 'Number'
      });
      MessagePlugin.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
    };

    const insertAfter = (row: any) => {
      const randomKey = Math.round(Math.random() * Math.random() * 1000) + 10000;
      tableRef.value?.insertAfter(row.key, {
        id: randomKey,
        key: `申请人 ${randomKey} 号`,
        platform: '纸质签署',
        type: 'Number'
      });
      MessagePlugin.success(`已插入子节点申请人 ${randomKey} 号，请展开查看`);
    };

    const columns = [
      {
        colKey: 'drag',
        title: '排序',
        cell: () => <MoveIcon />,
        width: 46
      },
      {
        colKey: 'id',
        title: '编号',
        ellipsis: true,
        width: 80
      },
      {
        width: 180,
        colKey: 'key',
        title: '申请人',
        ellipsis: true
      },
      {
        colKey: 'platform',
        title: '签署方式',
        width: 100
      },
      {
        colKey: 'operate',
        width: 340,
        title: '操作',
        cell: (_: any, { row }: any) => (
          <div class="tdesign-table-demo__table-operations">
            <TLink variant="text" hover="color" onClick={() => appendTo(row)}>
              插入
            </TLink>
            <TLink variant="text" hover="color" onClick={() => insertBefore(row)}>
              前插
            </TLink>
            <TLink variant="text" hover="color" onClick={() => insertAfter(row)}>
              后插
            </TLink>
            <TLink variant="text" hover="color" onClick={() => onEditClick(row)}>
              更新
            </TLink>
            <TLink variant="text" hover="color" onClick={() => onLookUp(row)}>
              查看
            </TLink>
            <TPopconfirm content="确认删除吗" onConfirm={() => onDeleteConfirm(row)}>
              <TLink variant="text" hover="color" theme="danger">
                删除
              </TLink>
            </TPopconfirm>
          </div>
        )
      }
    ];

    const onPageChange = (pageInfo: any) => {
      pagination.current = pageInfo.current;
      pagination.pageSize = pageInfo.pageSize;
      data.value = getData(pageInfo.current);
    };

    const onRowToggle = () => {
      const rowIds = ['申请人 1_1 号', '申请人 2_1 号', '申请人 3_1 号', '申请人 4_1 号'];
      rowIds.forEach((id) => {
        const rowData = tableRef.value?.getData(id);
        tableRef.value?.toggleExpandData(rowData);
      });
    };

    const treeExpandAndFoldIconRender = (_: any, { type, row }: any) => {
      if (lazyLoadingData.value && lazyLoadingData.value.key === row?.key) {
        return <Loading size="14px" />;
      }
      return type === 'expand' ? <ChevronRightIcon /> : <ChevronDownIcon />;
    };

    const lazyLoadingTreeIconRender = (_: any, params: any) => {
      const { type, row } = params;
      if (lazyLoadingData.value && lazyLoadingData.value.key === row?.key) {
        return <Loading size="14px" />;
      }
      return type === 'expand' ? <AddRectangleIcon /> : <MinusRectangleIcon />;
    };

    const getTreeNode = () => {
      const treeData = tableRef.value?.getTreeNode();
      console.log(treeData);
      MessagePlugin.success('树形结构获取成功，请打开控制台查看');
    };

    const onExpandAllToggle = () => {
      expandAll.value = !expandAll.value;
      expandAll.value ? tableRef.value?.expandAll() : tableRef.value?.foldAll();
    };

    const appendToRoot = () => {
      const key = Math.round(Math.random() * 10010);
      const newData = {
        id: key,
        key: `申请人 ${key}_${1} 号`,
        platform: key % 2 === 0 ? '共有' : '私有',
        type: ['String', 'Number', 'Array', 'Object'][key % 4],
        default: ['-', '0', '[]', '{}'][key % 4],
        detail: {
          position: `读取 ${key} 个数据的嵌套信息值`
        },
        needed: key % 4 === 0 ? '是' : '否',
        description: '数据源'
      };
      tableRef.value?.appendTo('', newData);
    };

    const onAbnormalDragSort = (params: any) => {
      if (params.code === 1001) {
        MessagePlugin.warning('不同层级的元素，不允许调整顺序');
      }
    };

    const onExpandedTreeNodesChange = (expandedTreeNodes: any, context: any) => {
      if (!context.rowState) return;
      onTreeExpandChange(context);
    };

    const onTreeExpandChange = (context: any) => {
      if (context.row.list === true) {
        lazyLoadingData.value = context.row;
        const timer = setTimeout(() => {
          appendMultipleDataTo(context.row);
          lazyLoadingData.value = null;
          clearTimeout(timer);
        }, 200);
      }
    };

    const onDragSort = (params: any) => {
      // 可根据需要处理拖拽排序
    };

    const beforeDragSort = (params: any) => {
      return true;
    };

    const treeExpandIcon = computed(() => {
      if (customTreeExpandAndFoldIcon.value) {
        return treeExpandAndFoldIconRender;
      }
      return lazyLoadingTreeIconRender;
    });

    return () => (
      <div>
        <div>
          <TButton onClick={appendToRoot}>添加根节点</TButton>
          <TButton theme="default" style="margin-left: 16px" onClick={resetData}>
            重置/更新数据
          </TButton>
          <TButton theme="default" style="margin-left: 16px" onClick={onRowToggle}>
            任意节点展开/收起
          </TButton>
          <TButton theme="default" style="margin-left: 16px" onClick={onExpandAllToggle}>
            {expandAll.value ? '收起全部' : '展开全部'}
          </TButton>
          <TButton theme="default" style="margin-left: 16px" onClick={getTreeNode}>
            获取全部树形结构
          </TButton>
        </div>
        <br />
        <div>
          <TCheckbox v-model={customTreeExpandAndFoldIcon.value} style="vertical-align: middle">
            自定义折叠/展开图标
          </TCheckbox>
        </div>
        <br />
        <TEnhancedTable
          ref={tableRef}
          v-model:expandedTreeNodes={expandedTreeNodes.value}
          row-key="key"
          drag-sort="row-handler"
          data={data.value}
          columns={columns}
          tree={treeConfig}
          tree-expand-and-fold-icon={treeExpandIcon.value}
          pagination={pagination}
          before-drag-sort={beforeDragSort}
          column-controller={columnController.value}
          lazy-load
          onPageChange={onPageChange}
          onAbnormalDragSort={onAbnormalDragSort}
          onDragSort={onDragSort}
          onExpandedTreeNodesChange={onExpandedTreeNodesChange}
        />
        <style>
          {`
            .tdesign-table-demo__table-operations .t-link {
              padding: 0 8px;
            }
          `}
        </style>
      </div>
    );
  }
});
