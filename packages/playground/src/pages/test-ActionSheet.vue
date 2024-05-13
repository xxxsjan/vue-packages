<template>
  <MyButton @click="handleClick">ActionSheet</MyButton>
  <ActionSheet v-model="open" />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const open = ref(false);

const handleClick = () => {
  open.value = true;
};
onMounted(() => {
  let avatarId = 'xxx';
  // fetch('https://api.multiavatar.com/' + JSON.stringify(avatarId))
  //   .then((res) => res.text())
  //   .then((svg) => console.log(svg));
});
</script>
<style scoped></style>
