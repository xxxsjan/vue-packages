<template>
  <button @click="handleClick" :class="className" @animationend="onAnimationend">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { ref, reactive, computed } from 'vue';
export default {
  name: 'MyButton',
  setup(props, { emit }) {
    const pulsing = ref(false);
    const className = computed(() => {
      return {
        btn: true,
        pulsing: pulsing.value,
      };
    });

    function onAnimationend() {
      pulsing.value = false;
    }
    function handleClick(event: MouseEvent) {
      // if (props.disabled || props.loading || event.button) return
      pulsing.value = false;
      requestAnimationFrame(() => {
        pulsing.value = true;
      });
      emit('click', event);
    }
    return {
      className,
      handleClick,
      onAnimationend,
    };
  },
};
</script>

<style>
.btn {
  /* 40 32 24 */
  height: 32px;
  font-size: 14px;
  line-height: 32px;
  color: #fff;
  vertical-align: middle;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px;
  font-weight: 400;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: rgb(255, 183, 51);
  border: 1px solid rgb(255, 165, 0);
  border-radius: 4px;
  outline: 0;
  transition: color 250ms ease;
}

.btn:hover {
  color: black;
  background-color: #bfa;
  border-color: #333;
  /* outline: dashed red; */
}

.btn:active {
  color: black;
  background-color: orange;
  border-color: #333;
}

.pulsing {
  animation: shadow 500ms;
}

@keyframes shadow {
  0% {
    box-shadow: 0 0 1px 0 orange;
    opacity: 100%;
  }

  100% {
    box-shadow: 0 0 1px 10px orange;
    opacity: 0%;
  }
}
</style>
