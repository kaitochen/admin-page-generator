<template>
  <el-date-picker
    class="flex-full"
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
    range-separator="-"
    :value-format="element.config.format"
    :type="element.config.type"
  ></el-date-picker>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-date-picker",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },

  watch: {
    "element.config.type": function(val) {
      switch (val) {
        case "date":
          this.element.config.format = "yyyy-MM-dd";
          this.value = "";
          break;
        case "daterange":
          this.element.config.format = "yyyy-MM-dd";
          this.value = [];
          break;
        case "month":
          this.element.config.format = "yyyy-MM-dd";
          this.value = "";
          break;
        case "monthrange":
          this.element.config.format = "yyyy-MM";
          this.value = [];
          break;
        case "year":
          this.element.config.format = "yyyy";
          this.value = "";
          break;
      }
    }
  }
};
</script>
