<template>
    <input type="text" class="edit-input" :value="value" @input="onInput" @blur="onBlur" @click="onClick" />
</template>

<script setup>
// https://juejin.cn/post/7108542695387168799
import { ref } from 'vue';

const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    setValue: {
        type: Function,
        default: () => { }
    }
});

const inputValue = ref(props.value);

const onInput = (e) => {
    inputValue.value = e.target.value.trim();
}

const onClick = (e) => {
    e.stopPropagation();
}

const onBlur = () => {
    props.setValue(inputValue.value);
}
</script>

<style scoped>
.edit-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid orange;
    text-align: center;
    outline: none;
}
</style>