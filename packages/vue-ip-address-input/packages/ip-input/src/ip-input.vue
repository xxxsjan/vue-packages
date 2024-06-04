<template>
  <div class="ip-input-container">
    <input v-model="val0" ref="inputRef0" type="text" class="ip-input" />.
    <input v-model="val1" ref="inputRef1" type="text" class="ip-input" />.
    <input v-model="val2" ref="inputRef2" type="text" class="ip-input" />.
    <input v-model="val3" ref="inputRef3" type="text" class="ip-input" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect, watch, onMounted } from "vue";
type IpInputType = {
  modelValue: string;
};
const val0 = ref("");
const val1 = ref("");
const val2 = ref("");
const val3 = ref("");
const valList = reactive([val0, val1, val2, val3]);

const inputRef0 = ref<HTMLInputElement>();
const inputRef1 = ref<HTMLInputElement>();
const inputRef2 = ref<HTMLInputElement>();
const inputRef3 = ref<HTMLInputElement>();
const inputRefs = reactive([inputRef0, inputRef1, inputRef2, inputRef3]);

const props = defineProps<IpInputType>();
const emits = defineEmits(["update:modelValue", "change"]);

const maxLength = 3;

watchEffect(() => {
  const _modelValueList = props.modelValue.split(".");

  val0.value = _modelValueList[0] || "";
  val1.value = _modelValueList[1] || "";
  val2.value = _modelValueList[2] || "";
  val3.value = _modelValueList[3] || "";
});

function setFocus(index: number) {
  if (inputRefs[index].value) {
    (inputRefs[index].value as HTMLInputElement).focus();
  }
}

function watchVal(index: number) {
  return function handler(newVal: string, oldVal: string | undefined) {
    const curIdx = Number(index);
    if (Number.isNaN(curIdx)) {
      return;
    }
    const preIdx = curIdx - 1;
    const nextIdx = curIdx + 1;
    const curNum = Number(newVal);

    // 仅数字
    if (/\D/g.test(newVal)) {
      valList[index].value = newVal.replace(/\D/g, "");
    }
    // 长度判断
    if (newVal.length >= maxLength) {
      if (newVal.length > maxLength) {
        valList[index].value = valList[index].value.substring(0, maxLength);
      } else if (newVal.length == maxLength) {
        if (curNum > 255) {
          valList[index].value = "255";
        }
      }

      if (nextIdx < 4) {
        setFocus(nextIdx);
      }
    }
    // 退格到空
    if (newVal.length == 0 && preIdx >= 0) {
      setFocus(preIdx);
    }
    const _newVal = valList.map((m) => m.value).join(".");
    emits("update:modelValue", _newVal);
    emits("change", _newVal);
  };
}

watch(() => val0.value, watchVal(0));
watch(() => val1.value, watchVal(1));
watch(() => val2.value, watchVal(2));
watch(() => val3.value, watchVal(3));

onMounted(() => {});
</script>
