<template>
  <div ref="screenRef" class="screen-container">
    <template v-if="isReady">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";

function debounce(func, delay = 100) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
export default {
  name: "screen-container",
  props: {
    width: {
      type: Number,
      default: 1920,
    },
    height: {
      type: Number,
      default: 1080,
    },
    aspectRatio: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isReady: false,
      screenRef: null,
      _width: 0,
      _height: 0,
      erd: null,
    };
  },
  mounted() {
    this.sizeInit();
    this.addListen();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    initWidthHeight() {
      this._width = this.width || window.innerWidth;
      this._height = this.height || window.innerHeight;
      if (this.$refs.screenRef) {
        this.$refs.screenRef.style.width = `${this._width}px`;
        this.$refs.screenRef.style.height = `${this._height}px`;
      }
    },

    setScale() {
      if (this.$refs.screenRef) {
        if (this.aspectRatio) {
          const ratio = this.aspectRatio ? this._width / this._height : 1;

          const w = window.innerWidth / this._width;
          this.$refs.screenRef.style.transform = `scale(${w})`;
        } else {
          this.$refs.screenRef.style.transform = `scale(${
            window.innerWidth / this._width
          },${window.innerHeight / this._height})`;
        }
      }
    },
    async sizeInit() {
      await this.initWidthHeight(); // 初始化内容尺寸
      this.setScale(); // 设置内容缩放比例（适应屏幕尺寸）
      this.isReady = true; // 宽高设置完毕
    },
    addListen() {
      this.erd = elementResizeDetectorMaker({
        strategy: "scroll",
      });
      const handler = debounce(() => {
        // if (this.$refs.screenRef) {
        //   this.$refs.screenRef.style.transform = `scale(${
        //     window.innerWidth / this._width
        //   },${window.innerHeight / this._height})`;
        // }
        this.setScale();
      });
      this.erd.listenTo(document.body, handler);
    },
    removeEvent() {
      this.erd && this.erd.uninstall(document.body);
    },
  },
};
</script>
<style scoped>
.screen-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  overflow: hidden;
  transform-origin: left top;
}
</style>
