<template>
  <div class="slide-show">
    <SlideShowTop v-model="activeIdx"> </SlideShowTop>
    <div class="content-slide">
      <div
        class="content-item-wrap"
        :style="{ width: winWidth * imgList.length + 'px' }"
      >
        <div
          class="content-item"
          v-for="item in imgList"
          :data-index="item"
          :style="{ width: itemWidth + 'px' }"
        >
          <img :src="item.cover2" :alt="item.title" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import multiavatar from "@multiavatar/multiavatar/esm";
import SlideShowTop from "./slide-show-top.vue";
import imgData from "./imgData.json";

let itemEl: HTMLDivElement,
  itemWrapEl: HTMLDivElement,
  itemWidth: number,
  itemCount: number;
const activeIdx = ref(0);

const imgList = imgData.inazuma.charList;
watch(
  () => activeIdx.value,
  (val) => {
    setIndex(val);
  }
);

const winWidth = document.documentElement.clientWidth;
console.log("winWidth: ", winWidth);
itemWidth = winWidth;
function setIndex(index: number) {
  activeIdx.value = Math.abs(index);
  let idx = -parseInt(index + "");
  setWrapLeft(idx * itemWidth);
}
function setWrapLeft(px: number) {
  itemWrapEl.style.marginLeft = px + "px";
}

function bindEvent() {
  let preX = 0;
  let nowX = 0;
  let startLeft: number;
  const isPc = () => /Windows/g.test(navigator.userAgent);

  const START = isPc() ? "mousedown" : "touchstart";
  const MOVE = isPc() ? "mousemove" : "touchmove";
  const END = isPc() ? "mouseup" : "touchend";

  function handleStart(e: MouseEvent | TouchEvent) {
    preX = nowX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    startLeft = itemWrapEl.style.marginLeft
      ? parseInt(itemWrapEl.style.marginLeft)
      : 0;
    itemWrapEl.classList.add("active");

    itemWrapEl?.addEventListener(MOVE, handleMove);
  }
  function handleEnd() {
    itemWrapEl.classList.remove("active");
    preX = 0;
    nowX = 0;
    const _marginLeft = parseInt(itemWrapEl.style.marginLeft);

    if (_marginLeft > 0) {
      // setWrapLeft(0);
      setIndex(0);
    } else if (_marginLeft < -itemWidth * (itemCount - 1)) {
      // setWrapLeft(-itemWidth * (itemCount - 1));
      setIndex(itemCount - 1);
    } else {
      const hadScrollNum = _marginLeft / itemWidth;
      // setWrapLeft(Math.round(hadScrollNum) * itemWidth);
      setIndex(Math.round(hadScrollNum));
    }

    itemWrapEl?.removeEventListener(MOVE, handleMove);
  }
  function handleMove(e: MouseEvent | TouchEvent) {
    nowX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
    const delta = nowX - preX;
    itemWrapEl.style.marginLeft = startLeft + delta + "px";
  }

  itemWrapEl?.addEventListener(START, handleStart);
  itemWrapEl?.addEventListener(END, handleEnd);
  return () => {
    itemWrapEl?.removeEventListener(START, handleStart);
    itemWrapEl?.removeEventListener(END, handleEnd);
  };
}
onMounted(() => {
  itemEl = document.querySelector(".content-item") as HTMLDivElement;
  itemWrapEl = document.querySelector(".content-item-wrap") as HTMLDivElement;

  // itemWidth = itemEl?.getBoundingClientRect().width;
  itemCount = document.querySelectorAll(".content-item").length;

  bindEvent();
});
</script>
<style lang="scss" scoped>
.content-slide {
  width: 100vw;
  overflow-x: scroll;
  overflow: hidden;
  /* transition: all 1s ease; */
}
.content-item-wrap {
  transition: all 0.5s ease;
}
.content-item-wrap.active {
  transition: none;
}
.content-item {
  display: inline-block;
  position: relative;
}
/* .content-item::before { */
/* content: attr(data-index); */
/* position: absolute; */
/* left: 0; */
/* } */
.content-item img {
  width: 100%;
}
</style>
