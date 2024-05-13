<template>
  <div v-magnifier class="img-wrap" :style="{
    width: imgWidth + 'px',
    height: imgHeight + 'px',
  }">
    <a :href="imgUrl" :target="blank ? '_blank' : ''" class="mag-wrap" :style="{
      width: magWidth + 'px',
      height: magHeight + 'px',
    }">
      <img :src="imgUrl" :alt="imgAlt" :style="{
        width: imgWidth + 'px',
        height: imgHeight + 'px',
      }" />
    </a>

    <a class="static-wrap">
      <img class="static-img" :src="imgUrl" :alt="imgAlt" :style="{
        width: '100%',
        height: '100%',
      }" />
    </a>
  </div>
</template>
<script lang="ts">
export default {
  directives: {
    // 自定义私有指令focus，在使用的时候要用 v-focus 。
    magnifier: {
      mounted(el) {
        const maxWidth = el.offsetWidth;
        const maxHeight = el.offsetHeight;
        const imgX = el.offsetLeft;
        const imgY = el.offsetTop;

        const magWrap = el.querySelector('.mag-wrap'),
          magImg = magWrap.querySelector('img');

        let magWidth: number, magHeight: number;

        el.addEventListener(
          'mouseover',
          function () {
            magWrap.classList.add('show');
            magWidth = magWrap.offsetWidth;
            magHeight = magWrap.offsetHeight;
            document.addEventListener('mousemove', handleMousemove, false);
          },
          false
        );
        el.addEventListener('mouseout', function () {
          magWrap.classList.remove('show');
          document.removeEventListener('mousemove', handleMousemove);
        });

        function handleMousemove(e: MouseEvent) {
          const x = e.pageX - imgX,
            y = e.pageY - imgY;

          if (e.pageX >= imgX && e.pageX <= imgX + maxWidth && e.pageY >= imgY && e.pageY <= imgY + maxHeight) {
            setMagPosition(x, y);
          } else {
            magWrap.classList.remove('show');
            document.removeEventListener('mousemove', handleMousemove);
          }
        }
        function setMagPosition(x: number, y: number) {
          const left = x - magWidth / 2;
          const top = y - magHeight / 2;

          magWrap.style.left = left + 'px';
          magWrap.style.top = top + 'px';

          magImg.style.left = -left + 'px';
          magImg.style.top = -top + 'px';
        }
      },
    },
  },
};
</script>

<script lang="ts" setup>
import { onMounted, toRefs } from 'vue';
type Props = {
  imgWidth: string | number;
  imgHeight: string | number;
  imgUrl: string;
  blank: boolean;
  imgAlt: string;
  magWidth: string | number;
  magHeight: string | number;
};
const props = withDefaults(defineProps<Props>(), {});

const { imgWidth, imgHeight, imgUrl, blank, imgAlt } = toRefs(props);
onMounted(() => {
  function isDesktop() {
    var userAgent = navigator.userAgent;
    var keywords = ['Windows', 'Macintosh'];

    // 判断userAgent中是否包含Windows或Macintosh关键词
    return keywords.some(function (keyword) {
      return userAgent.indexOf(keyword) !== -1;
    });
  }

  if (isDesktop()) {
    console.log('This is a desktop device.');
  } else {
    alert('放大镜 不支持移动端')
  }
});
</script>
<style scoped>
.img-wrap {
  position: relative;
}

.mag-wrap {
  display: none;
  position: absolute;
  overflow: hidden;
  z-index: 2;
  box-shadow: 0px 0px 3px #999;
  cursor: move;
}

.mag-wrap.show {
  transform: scale(1.5);
  display: block;
}

.mag-wrap img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
