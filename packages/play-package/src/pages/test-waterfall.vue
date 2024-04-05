<template>
  <Waterfall
    :data="list"
    v-model:finished="finished"
    @onBottom="onBottom"
  ></Waterfall>
</template>

<script lang="ts" setup>
import Waterfall from "@/components/water-fall.vue";
import { ref } from "vue";
const imgSrc = () =>
  Math.random() > 0.5
    ? "https://uploadstatic.mihoyo.com/ys-obc/2022/01/25/4328207/e8702589657bcca6f5ec4a934273718b_9107524593978383112.jpg"
    : "https://uploadstatic.mihoyo.com/ys-obc/2022/02/15/6276411/2a54cd4008e8bc398f3f8bdc08225048_2883595654384922672.jpg";

const list = ref(
  new Array(10).fill("").map((_) => ({
    src: imgSrc(),
    footer: "八重神子",
  }))
);
const finished = ref(false);

function onBottom() {
  setTimeout(() => {
    list.value.push(
      ...new Array(10).fill("").map((_, i) => ({
        src: imgSrc(),
        footer: "八重",
      }))
    );
    if (list.value.length >= 9) {
      finished.value = true;
    }
  }, 555);
}
</script>

<style scoped></style>
