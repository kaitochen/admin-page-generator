<template>
  <el-input-number
    class="flex-full"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    show-word-limit
    :max="element.config.max"
    :min="element.config.min"
    :step="element.config.step"
    :precision="element.config.precision"
  ></el-input-number>
</template>
<script>
export default {
  name: "pgd-number",
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
