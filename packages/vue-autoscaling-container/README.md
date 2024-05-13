# autoscaling-container

## 更新

- 添加纵横比

## 使用

```ts
import { createApp } from "vue";

import AutoScalingContainer from "autoscaling-container";
const app = createApp(App);

app.use(AutoScalingContainer);
```

```vue
<template>
  <AutoScalingContainer>
    <div
      style="width: 100%; height: 100%; background-color: aqua"
      :aspectRatio="true"
    ></div>
  </AutoScalingContainer>
</template>
```

## props

| props       | 类型    | 事例 |
| ----------- | ------- | ---- |
| width       | number  | 1920 |
| height      | number  | 1080 |
| aspectRatio | boolean | true |

## event

| event | 类型 | 事例 |
| ----- | ---- | ---- |
