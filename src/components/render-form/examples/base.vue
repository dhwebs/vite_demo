<template>
  <div class="app-container">
    <h1>JSON 表单生成器</h1>
    <div class="form-container">
      <h-render-form
        v-model:formData="formData"
        :config="formConfig"
        @submit="handleSubmit"
        @change="handleChange"
      >
        <template #position>
          <div>123123</div>
        </template>
      </h-render-form>
    </div>

    <div class="debug-panel">
      <h3>表单数据：</h3>
      <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, h } from 'vue';

const formData = reactive({
  name: '张三',
  gender: 'male',
  skills: ['vue', 'node']
});
const handleSubmit = (data) => {
  console.log('提交数据:', data, formData);
  // 提交到API或执行其他操作
};

const handleChange = ({ name }) => {
  console.log(`字段 ${name} 变化`, formData);
};
const formConfig = {
  labelWidth: 120,
  layout: 'vertical',
  sections: [
    {
      type: 'box',
      elementName: 'div',
      title: '基本信息',
      style: 'margin-bottom: 24px',
      children: [
        {
          elementName: 't-form-item',
          name: 'name',
          label: '姓名',
          help: '这里可以展示一段说明文字',
          children: [
            {
              elementName: 't-input',
              name: 'name',
              placeholder: '请输入姓名',
              rules: [
                { required: true, message: '姓名不能为空', trigger: 'change' },
                { min: 2, message: '至少2个字符' }
              ],
              clearable: true
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'gender',
          label: '性别',
          children: [
            {
              elementName: 't-select',
              name: 'gender',
              options: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' }
              ]
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'birthday',
          label: '出生日期',
          children: [
            {
              elementName: 't-date-picker',
              name: 'birthday',
              dateType: 'date',
              format: 'YYYY-MM-DD'
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'phone',
          label: '手机号',
          children: [
            {
              elementName: 't-input',
              name: 'phone',
              formLabel: '手机号',
              placeholder: '请输入手机号',
              rules: [{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }]
            }
          ]
        }
      ]
    },
    {
      type: 'box',
      elementName: 'div',
      title: '工作信息',
      grid: 1,
      style: 'margin-bottom: 24px',
      children: [
        {
          elementName: 't-form-item',
          name: 'company',
          label: '工作单位',
          children: [
            {
              elementName: 't-input',
              name: 'company',
              placeholder: '请输入工作单位名称'
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'position',
          label: '职位',
          children: [
            {
              elementName: 't-select',
              name: 'position',
              options: [
                { label: '经理', value: 'manager' },
                { label: '工程师', value: 'engineer' }
              ]
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'gender2',
          label: '性别',
          showComponent: () => formData.position === 'manager',
          children: [
            {
              elementName: 't-select',
              name: 'gender2',
              options: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' }
              ]
            }
          ]
        },
        {
          elementName: 't-form-item',
          name: 'position',
          label: '部门',
          children: [
            {
              elementName: 't-select',
              name: 'department',
              options: []
            }
          ]
        }
      ]
    },
    {
      elementName: 't-form-item',
      name: 'skills',
      label: '技术能力',
      children: [
        {
          elementName: 't-checkbox-group',
          name: 'skills',
          formLabel: '技术能力',
          options: [
            { label: 'Vue.js', value: 'vue' },
            { label: 'React', value: 'react' },
            { label: 'Node.js', value: 'node' }
          ]
        }
      ]
    },
    {
      elementName: 't-form-item',
      name: 'resume',
      label: '上传简历',
      children: [
        {
          elementName: 't-upload',
          name: 'resume',
          tip: '支持PDF、Word文档',
          multiple: false,
          accept: '.pdf,.doc,.docx',
          trigger: () =>
            h(
              TButton,
              {
                variant: 'outline',
                onClick: () => console.log('动态更新的点击事件')
              },
              '动态按钮'
            )
        }
      ]
    },
    {
      elementName: 't-form-item',
      name: 'remark',
      label: '备注',
      children: [
        {
          elementName: 't-textarea',
          name: 'remark',
          placeholder: '请输入其他信息',
          maxlength: 200,
          'show-limit-number': true
        }
      ]
    }
  ],
  actions: [
    {
      elementName: 't-button',
      key: 'submit',
      type: 'submit',
      label: '提交',
      theme: 'primary',
      loading: true
    },
    {
      elementName: 't-button',
      key: 'reset',
      type: 'reset',
      label: '重置',
      theme: 'default'
    },
    {
      elementName: 't-button',
      key: 'cancel',
      label: '取消',
      theme: 'danger'
    }
  ]
};
</script>
