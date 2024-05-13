<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelValue" class="action-sheet-wrapper">
        <div class="mask" @click.prevent="handleMask"></div>
        <div class="action-sheet"><span @click="emit('update:modelValue', false)" class="close">X</span></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
type Props = {
  modelValue: boolean;
};
// {modelValue: { type: Boolean, default: false }}
const props = defineProps<Props>();
const handleMask = () => {
  emit('update:modelValue', false);
};
const emit = defineEmits(['update:modelValue']);
const wrapH = ref('50vh');
</script>

<style scoped>
.action-sheet-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 10;
}

.action-sheet-wrapper .mask {
  position: absolute;
  background-color: transparent;
  backdrop-filter: blur(1px);
  width: 100%;
  height: 100%;
}

.action-sheet-wrapper .close {
  position: absolute;
  right: 10px;
  top: 10px;
}

.action-sheet {
  width: 100vw;
  height: 70vh;
  /* height: v-bind(wrapH); */
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  border-radius: 10px 10px 0 0;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100%);
}

.v-enter-to,
.v-leave-form {
  transform: translateY(0%);
}
</style>
