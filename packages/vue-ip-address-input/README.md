# vue-ip-address-input

## 更新

-

## 使用

```ts
import { createApp } from "vue";

import IpInput from "vue-ip-address-input";
const app = createApp(App);
app.use(IpInput, {});
```

```vue
<template>
  <ip-input v-model="ipVal" @change="ipChange" />
</template>

<script setup>
const ipVal = ref("192.168.1.1");
function ipChange(v) {
  console.log(v);
}
</script>
```

## props

| props   | 类型   | 事例        |
| ------- | ------ | ----------- |
| v-model | string | 192.168.1.1 |

## event

| event  | 类型                   | 事例                     |
| ------ | ---------------------- | ------------------------ |
| change | ( value:string )=>void | function(value:string){} |
