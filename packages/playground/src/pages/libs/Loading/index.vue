<template>
  <div v-show="showLoading" class="loading">Loading...</div>
</template>
<script lang="ts" setup>
const showLoading = ref(false);
const show = () => (showLoading.value = true);
const hide = () => (showLoading.value = false);
defineExpose({
  show,
  hide,
});
</script>
<style>
.loading {
  position: fixed;
  top: 0;
  margin: auto;
  text-align: center;
}
</style>
