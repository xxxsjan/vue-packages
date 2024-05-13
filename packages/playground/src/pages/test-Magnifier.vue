<template>
  <div class="test-Magnifier">
    <Magnifier
      class="Magnifier"
      imgUrl="https://uploadstatic.mihoyo.com/ys-obc/2022/01/25/4328207/e8702589657bcca6f5ec4a934273718b_9107524593978383112.jpg"
      imgWidth="375"
      :imgHeight="(375 * 809) / 319"
      magWidth="100"
      magHeight="100"
      :blank="true"
      imgAlt="八重神子"
    ></Magnifier>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
const img = new Image();
img.src =
  'https://uploadstatic.mihoyo.com/ys-obc/2022/01/25/4328207/e8702589657bcca6f5ec4a934273718b_9107524593978383112.jpg';
img.onload = function (this: any) {
  console.log(this.width, this.height);
};
onMounted(() => {});
</script>
<style scoped>
.test-Magnifier {
  width: 100%;
}
.test-Magnifier .Magnifier {
  margin: 0 auto;
}
</style>
