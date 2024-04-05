<template>
  <ip-input v-model="ipVal" @change="ipChange" />
</template>

<script setup>
import { ref } from "vue";

const ipVal = ref("192.168.1.1");

function ipChange(v) {
  console.log(v);
}
</script>

<style lang="scss" scoped></style>
