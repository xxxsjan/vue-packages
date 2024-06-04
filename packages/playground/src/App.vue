<script setup lang="ts">
import TestAutoScalingContainer from "./pages/autoscaling-container.vue";
import TestIp from "./pages/test-ip-input.vue";
import Waterfall from "./pages/test-waterfall.vue";

import SlideShow from "@/components/slide-show/index.vue";

import DragList from "@/components/drag-list/index.vue";
</script>

<template>
  <div>
    <h1>TestIp</h1>
    <TestIp />
    <!-- <h1>AutoScalingContainer</h1> -->
    <!-- <TestAutoScalingContainer /> -->
    <h1>Waterfall</h1>
    <Waterfall />
    <h1>SlideShow</h1>
    <SlideShow />
    <h1>DragList</h1>
    <DragList />
  </div>
</template>

<style scoped></style>
