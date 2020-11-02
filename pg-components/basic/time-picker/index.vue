<template>
  <el-time-picker
    class="flex-full"
    v-model="value"
    :disabled="readOnly || element.config.disabled"
    range-separator="-"
    :is-range="element.config.isRange"
    arrow-control
    value-format="HH:mm:ss"
  ></el-time-picker>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-time-picker",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },
  watch: {
    "element.config.isRange": function(val) {
      this.value = val ? [] : "";
    }
  }
};
</script>
