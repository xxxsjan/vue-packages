<template>
  <a href="" class="x-link">
    <slot></slot>
  </a>
</template>

<script setup>
defineOptions({
  name: 'x-link',
});
</script>

<style scoped lang="scss">
.x-link {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  &::after {
    content: "";
    background-color: #409eff;
    height: 0.125rem;
    left: 0;
    bottom: 0;
    position: absolute;
    right: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.5s ease;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
}
</style>
