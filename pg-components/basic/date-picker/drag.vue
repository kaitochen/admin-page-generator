<template>
  <el-date-picker
    class="flex-full"
    v-model="element.config.defaultValue"
    :disabled="readOnly || element.config.disabled"
    range-separator="-"
    :value-format="element.config.format"
    :type="element.config.type"
  ></el-date-picker>
</template>
<script>
export default {
  name: "pgd-date-picker",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
    }
  },
  watch: {
    "element.config.type": function(val) {
      switch (val) {
        case "date":
        case "daterange":
          this.element.config.format = "yyyy-MM-dd";
          break;
        case "month":
        case "monthrange":
          this.element.config.format = "yyyy-MM";
          break;
        case "year":
          this.element.config.format = "yyyy";
          break;
      }
    }
  }
};
</script>
