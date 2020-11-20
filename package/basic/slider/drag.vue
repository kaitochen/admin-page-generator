<template>
  <el-slider
    class="flex-full"
    :disabled="readOnly || element.config.disabled"
    show-tooltip
    :max="element.config.max"
    :min="element.config.min"
    :step="element.config.step"
    :range="element.config.multiple"
  ></el-slider>
</template>
<script>
export default {
  name: "pgd-slider",
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
