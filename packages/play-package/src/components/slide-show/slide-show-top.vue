<template>
  <div class="top-slide">
    <img
      class="slide-item"
      v-for="(item, i) in imgList"
      :src="item.icon"
      alt=""
      :data-index="i"
      :key="i"
      @click="onClick(i)"
      :class="{ active: i === modelValue }"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue";
// import multiavatar from '@multiavatar/multiavatar/esm';
// import $ from 'jquery';
import gsap from "gsap";
import imgData from "./imgData.json";
console.log("imgData: ", imgData.inazuma.charList);
let wrapEl: HTMLDivElement;
let itemWidth: number;
const imgList = imgData.inazuma.charList;

const props = defineProps({
  modelValue: Number,
});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
function onClick(i: number) {
  emit("update:modelValue", i);
  // wrapEl.scrollLeft = (i - 1) * itemWidth;
  // $('.top-slide').animate({ scrollLeft: (i - 1) * itemWidth }, 500);
  gsap.to(".top-slide", {
    scrollLeft: (i - 1) * itemWidth,
    duration: 0.5,
  });
}

onMounted(() => {
  wrapEl = document.querySelector(".top-slide") as HTMLDivElement;
  const itemEl = document.querySelector(".slide-item") as HTMLDivElement;
  itemWidth = itemEl.getBoundingClientRect().width;
});
</script>
<style lang="scss" scoped>
.top-slide {
  width: 100vw;
  white-space: nowrap;
  overflow-x: scroll;
  transition: all 1s;

  display: flex;
}
.top-slide img {
  width: 70px;
  &.active {
    background-color: pink;
  }
}
</style>
