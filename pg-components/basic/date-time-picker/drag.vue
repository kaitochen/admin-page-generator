<template>
  <el-date-picker
    class="flex-full"
    :disabled="readOnly || element.config.disabled"
    range-separator="-"
    :type="element.config.isRange ? 'datetimerange' : 'datetime'"
    time-arrow-control
    value-format="yyyy-MM-dd HH:mm:ss"
  ></el-date-picker>
</template>
<script>
export default {
  name: "pgd-date-time-picker",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
    }
  }
};
</script>
