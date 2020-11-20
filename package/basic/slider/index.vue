<template>
  <el-slider
    class="flex-full"
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
    show-tooltip
    :max="element.config.max"
    :min="element.config.min"
    :step="element.config.step"
    :range="element.config.multiple"
  ></el-slider>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-slider",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },
  watch: {},
  mounted() {}
};
</script>
