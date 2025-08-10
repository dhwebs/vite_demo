# 快速开始

HDesign-vue-next 是一个基于 Vue3 + TDesign-vue-next 的 UI 组件库。

## 安装

```js{4}
npm install hdesign-vue-next
```

## 全量引入

```js{4}
import { createApp } from 'vue';
import HDesign from 'hdesign-vue-next';
import App from './app.vue';

const app = createApp(App);
app.use(HDesign);

```

## 按需引入

**Input**

```js{4}
import { createApp } from 'vue';
import {Layout, IconSelect} from 'hdesign-vue-next';
import App from './app.vue';

const app = createApp(App);
app.use(Layout);
app.use(IconSelect);
```
