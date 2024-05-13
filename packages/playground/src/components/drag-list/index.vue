<template>
  <div class="drag-list">
    <div draggable="true" class="drag-item">1</div>
    <div draggable="true" class="drag-item">2</div>
    <div draggable="true" class="drag-item">3</div>
  </div>
  <button ref="btn">flip</button>
</template>

<script setup>
import { onMounted, ref } from "vue";
const btn = ref(null);

/**
 * dom变化前new 记录start
 * 操作dom后 调用play
 */
class Flip {
  constructor(dom, duration = 0.5) {
    this.dom = dom;
    this.duration = typeof duration === "number" ? `${duration}s` : duration;
    this.start = this.getLocation();
  }

  getLocation() {
    const rect = this.dom.getBoundingClientRect();
    return rect.top;
  }

  play() {
    const end = this.getLocation();
    console.log("end: ", end);
    const dis = this.start - end;
    this.dom.style.transform = `translateY(${dis}px)`;
    this.raf(() => {
      this.dom.style.transition = `transform ${this.duration}`;
      this.dom.style.removeProperty("transform");
    });
  }

  raf(cb) {
    requestAnimationFrame(() => {
      requestAnimationFrame(cb);
    });
  }
}
onMounted(() => {
  const list = document.querySelector(".drag-list");

  let sourceNode;

  list.ondragstart = (e) => {
    setTimeout(() => {
      e.target.classList.add("moving");
    }, 0);
    sourceNode = e.target;
  };
  list.ondragover = (e) => {
    e.preventDefault();
  };

  list.ondragenter = (e) => {
    e.preventDefault();

    if (e.target === list || e.target === sourceNode) {
      return;
    }
    const children = [...list.children];
    const sourceIdx = children.indexOf(sourceNode);
    const targetIdx = children.indexOf(e.target);

    if (sourceIdx < targetIdx) {
      list.insertBefore(sourceNode, e.target.nextElementSibling);
    } else {
      list.insertBefore(sourceNode, e.target);
    }
  };
  list.ondragend = (e) => {
    e.target.classList.remove("moving");
  };

  const firstEL = document.querySelector(".drag-item:first-child");
  let flip = new Flip(firstEL);
  
  btn.value.onclick = () => {
    list.insertBefore(firstEL, null);
    flip.play();
  };
});
</script>

<style lang="scss" scoped>
.drag-list {
  width: 500px;
  .drag-item {
    background-color: aqua;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    margin-bottom: 4px;
    text-align: center;
    line-height: 50px;

    &.moving {
      color: transparent;
      background-color: transparent;
      border: 1px dashed #ccc;
    }
  }
}
</style>
