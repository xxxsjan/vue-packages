import { markRaw, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";

import IpInput from "../ip-input.vue";

describe("IpInput.vue", () => {
  test("create", async () => {
    const input = ref("");
    const handleFocus = vi.fn();
    const wrapper = mount(() => <IpInput modelValue={input.value} />);

    const items = wrapper.findAll("input");
    expect(items.length).toBe(4);

    input.value = "192.168.1.1";

    await nextTick();

    expect(items[0].element.value).toMatchInlineSnapshot(`"192"`);
    expect(items[1].element.value).toMatchInlineSnapshot(`"168"`);
    expect(items[2].element.value).toMatchInlineSnapshot(`"1"`);
    expect(items[3].element.value).toMatchInlineSnapshot(`"1"`);
  });
});
