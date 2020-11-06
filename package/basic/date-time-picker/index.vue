<template>
  <el-date-picker
    class="flex-full"
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
    range-separator="-"
    :type="element.config.isRange ? 'datetimerange' : 'datetime'"
    time-arrow-control
    value-format="yyyy-MM-dd HH:mm:ss"
  ></el-date-picker>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-date-time-picker",
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
