<template>
  <el-time-picker
    class="flex-full"
    v-model="element.config.defaultValue"
    :disabled="readOnly || element.config.disabled"
    range-separator="-"
    :is-range="element.config.isRange"
    arrow-control
    value-format="HH:mm:ss"
  ></el-time-picker>
</template>
<script>
export default {
  name: "pgd-time-picker",
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
