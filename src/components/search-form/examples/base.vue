<template>
  <div class="app-container">
    <div class="form-container">
      <h-search-form
        v-model:formData="formData"
        :config="formConfig"
        @submit="handleSubmit"
        @change="handleChange"
      >
        <TFormItem label="关键词" name="keyword">
          <TInput v-model="form.keyword" placeholder="关键词" style="width: 180px" />
        </TFormItem>
        <TFormItem label="类别" name="category">
          <TSelect v-model="form.category" style="width: 180px">
            <TSelect.Option value="">类别</TSelect.Option>
            <TSelect.Option value="a">类别A</TSelect.Option>
            <TSelect.Option value="b">类别B</TSelect.Option>
            <TSelect.Option value="c">类别C</TSelect.Option>
          </TSelect>
        </TFormItem>
        <TFormItem label="状态" name="status">
          <TSelect v-model="form.status" style="width: 180px"> </TSelect>
        </TFormItem>
        <template #foldForm>
          <TFormItem label="日期" name="date">
            <TInput v-model="form.date" style="width: 180px" />
          </TFormItem>
          <TFormItem label="用户" name="user">
            <TInput v-model="form.user" placeholder="用户" style="width: 180px" />
          </TFormItem>
          <TFormItem label="类型" name="type">
            <TSelect v-model="form.type" style="width: 180px"> </TSelect>
          </TFormItem>
        </template>
      </h-search-form>
    </div>
  </div>
</template>

<script setup>
import {
  Form as TForm,
  FormItem as TFormItem,
  Input as TInput,
  Select as TSelect,
  Button as TButton
} from 'tdesign-vue-next';
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
const form = reactive({
  keyword: '',
  category: '',
  status: '',
  date: '',
  user: '',
  type: ''
});
</script>
