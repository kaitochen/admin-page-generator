<template>
  <el-input
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
  ></el-input>
</template>
<script>
export default {
  name: "pgd-input",
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
