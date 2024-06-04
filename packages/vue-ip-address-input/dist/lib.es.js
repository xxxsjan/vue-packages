import { defineComponent, ref, reactive, watchEffect, watch, onMounted, openBlock, createElementBlock, withDirectives, createElementVNode, vModelText, createTextVNode } from 'vue';

const _hoisted_1 = { class: "ip-input-container" };
const maxLength = 3;
var script = /*#__PURE__*/ defineComponent({
    __name: 'ip-input',
    props: {
        modelValue: { type: String, required: true }
    },
    emits: ["update:modelValue", "change"],
    setup(__props, { emit: __emit }) {
        const val0 = ref("");
        const val1 = ref("");
        const val2 = ref("");
        const val3 = ref("");
        const valList = reactive([val0, val1, val2, val3]);
        const inputRef0 = ref();
        const inputRef1 = ref();
        const inputRef2 = ref();
        const inputRef3 = ref();
        const inputRefs = reactive([inputRef0, inputRef1, inputRef2, inputRef3]);
        const props = __props;
        const emits = __emit;
        watchEffect(() => {
            const _modelValueList = props.modelValue.split(".");
            val0.value = _modelValueList[0] || "";
            val1.value = _modelValueList[1] || "";
            val2.value = _modelValueList[2] || "";
            val3.value = _modelValueList[3] || "";
        });
        function setFocus(index) {
            if (inputRefs[index].value) {
                inputRefs[index].value.focus();
            }
        }
        function watchVal(index) {
            return function handler(newVal, oldVal) {
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
                    }
                    else if (newVal.length == maxLength) {
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
        onMounted(() => { });
        return (_ctx, _cache) => {
            return (openBlock(), createElementBlock("div", _hoisted_1, [
                withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => ((val0).value = $event)),
                    ref_key: "inputRef0",
                    ref: inputRef0,
                    type: "text",
                    class: "ip-input"
                }, null, 512 /* NEED_PATCH */), [
                    [vModelText, val0.value]
                ]),
                createTextVNode(". "),
                withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => ((val1).value = $event)),
                    ref_key: "inputRef1",
                    ref: inputRef1,
                    type: "text",
                    class: "ip-input"
                }, null, 512 /* NEED_PATCH */), [
                    [vModelText, val1.value]
                ]),
                createTextVNode(". "),
                withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ((val2).value = $event)),
                    ref_key: "inputRef2",
                    ref: inputRef2,
                    type: "text",
                    class: "ip-input"
                }, null, 512 /* NEED_PATCH */), [
                    [vModelText, val2.value]
                ]),
                createTextVNode(". "),
                withDirectives(createElementVNode("input", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => ((val3).value = $event)),
                    ref_key: "inputRef3",
                    ref: inputRef3,
                    type: "text",
                    class: "ip-input"
                }, null, 512 /* NEED_PATCH */), [
                    [vModelText, val3.value]
                ])
            ]));
        };
    }
});

script.__file = "packages/ip-input/src/ip-input.vue";

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".ip-input-container {\n  width: 146px;\n  display: flex;\n  border: 1px solid #dcdfe6;\n  align-items: center;\n  border-radius: 4px;\n}\n\n.ip-input-container:focus-within {\n  outline: none;\n  border-color: #409eff;\n}\n\n.ip-input {\n  width: 30px;\n  padding: 0;\n  margin: 0;\n  border: none;\n  outline: none;\n  background: #fff;\n  text-align: center;\n}";
styleInject(css_248z);

function withInstall(comp) {
    comp.install = (app) => {
        const { name } = comp;
        app.component(name, comp); // 将组件注册成全局的组件
    };
    return comp;
}
const plugin = {
    install(app) {
        app.component("ip-input", script);
    },
};

export { plugin as default, withInstall };
