<template>
  <div ref="listRef" class="list-wrapper">
    <div
      class="waterfall-item"
      v-for="(item, index) in data"
      :key="index"
      :data-index="index"
      :style="`width: ${itemWidth}px`"
    >
      <div class="img">
        <img :src="item.src" alt="" />
      </div>
      <div class="item_title">{{ index }}</div>
      <div class="item_footer">{{ item.footer }}</div>
    </div>
    <div v-show="loading" style="position: fixed; bottom: 70px; left: 200px">
      loading...
    </div>
    <div v-show="finished" class="waterfall-footer">到底了</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, watch, toRefs } from "vue";

const listRef = ref(null);
const loading = ref(false);
type Props = {
  data: { src?: string; footer?: string }[];
  finished: boolean;
  itemWidth?: number | string;
};
const props = withDefaults(defineProps<Props>(), {
  finished: false,
  itemWidth: 180,
});
const { data, finished, itemWidth } = toRefs(props);

const emit = defineEmits(["onBottom"]);

onMounted(() => {
  const wrapper = document.querySelector(".list-wrapper")!;

  function updateData() {
    emit("onBottom");
  }

  let oldLen = data.value.length;

  watch(
    () => data,
    (newV, oldV) => {
      loading.value = true;
      nextTick(() => {
        layoutDom(oldLen, data.value.length);
        oldLen = data.value.length;
      });
    },
    {
      deep: true,
    }
  );
  function handleScroll(e: Event) {
    const { scrollTop, clientHeight, scrollHeight } =
      e.target as HTMLDivElement;
    if (scrollTop + clientHeight + 10 >= scrollHeight && !finished.value) {
      // console.log('触底');
      updateData();
    }
  }
  wrapper.addEventListener("scroll", handleScroll);

  let colHeight: number[] = [];
  function layoutDom(start: number, end: number, isResize = false) {
    // console.log('start, end: ', start, end);
    let allItems = (
      Array.from(
        document.querySelectorAll(".waterfall-item")
      ) as HTMLDivElement[]
    ).slice(start, end);

    const boxWidth: number = allItems[0].offsetWidth;
    const wrapper = document.querySelector(".list-wrapper") as HTMLDivElement;
    const pWidth: number = parseInt(getComputedStyle(wrapper).width);
    var cols = parseInt(pWidth / boxWidth + "");

    // console.log('宽度', boxWidth, '父宽', pWidth, '列数', cols);

    if (isResize || colHeight.length == 0) {
      colHeight = new Array(cols).fill(0);
    }

    const gap: number = (pWidth - boxWidth * cols) / (cols + 1);
    const lefts = colHeight.map((_, index) => {
      return boxWidth * index + gap * (index + 1);
    });
    const handler = (el: HTMLDivElement) => {
      const itemH = el.offsetHeight + 10; // 10为间距
      const minH = Math.min(...colHeight);
      const minIdx = colHeight.findIndex((it) => it == minH);

      el.style.left = `${lefts[minIdx]}px`;
      el.style.top = `${colHeight[minIdx]}px`;
      colHeight[minIdx] += itemH;

      const maxH = Math.max(...colHeight);
      const maxIdx = colHeight.findIndex((it) => it == maxH);
      const footerDom = document.querySelector(
        ".waterfall-footer"
      ) as HTMLDivElement;
      footerDom.style.left = `0px`;
      footerDom.style.top = `${colHeight[maxIdx]}px`;
      // console.log('最高', colHeight[maxIdx], window.innerHeight);
      if (
        colHeight[maxIdx] > window.innerHeight &&
        wrapper.style.height !== `calc(100vh - 50px)`
      ) {
        wrapper.style.height = `calc(100vh - 50px)`;
      }
    };

    if (!isResize) {
      // img需要加载完才能获取正确高度
      const allP = allItems.map((el: HTMLDivElement, index) => {
        const imgDom = el.querySelector("img")!;
        if (imgDom.src) {
          return new Promise((resolve, reject) => {
            imgDom.onload = function () {
              resolve(el);
            };
          });
        } else {
          return Promise.resolve(el);
        }
      });

      Promise.all(allP).then((els: HTMLDivElement[]) => {
        els.map(handler);
        loading.value = false;
      });
    } else {
      allItems.map(handler);
      loading.value = false;
    }
  }

  layoutDom(0, data.value.length);

  if (wrapper.scrollHeight === wrapper.clientHeight) {
    updateData();
  }

  function throttle(fn: () => void, time: number) {
    let timer: number | null;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fn();
          timer = null;
        }, time);
      }
    };
  }

  const resizeHandler = throttle(
    () => layoutDom(0, data.value.length, true),
    666
  );
  window.addEventListener("resize", resizeHandler);
});
</script>

<style scoped>
.list-wrapper {
  height: 100vh;
  overflow-y: scroll;
  background-color: rgb(222, 222, 222);
  position: relative;

  &&::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &&::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
}
.list-wrapper .waterfall-item {
  background-color: #fff;
  break-inside: avoid;
  text-align: left;
  border-radius: 10px;

  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;

  font-size: 20px;
}
.list-wrapper .waterfall-item .img img {
  width: 100%;
  border-radius: 5px 5px 0 0;
}
.item_title {
  padding-left: 12px;
}
.item_footer {
  padding-left: 12px;
}

.waterfall-footer {
  position: absolute;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  color: #000;
  text-align: center;
}
</style>
