<template>
  <el-input-number
    class="flex-full"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="isReadOnly || element.config.disabled"
    show-word-limit
    :max="element.config.max"
    :min="element.config.min"
    :step="element.config.step"
    :precision="element.config.precision"
  ></el-input-number>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-number",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },
  watch: {}
};
</script>
