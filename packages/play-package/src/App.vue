<script setup lang="ts">
import { ref } from "vue";

const ipVal = ref("192.168.1.1");

function ipChange(v: string) {
  console.log(v);
}
</script>

<template>
  <h1>play-package</h1>
  <ip-input v-model="ipVal" @change="ipChange" />
</template>

<style scoped></style>
