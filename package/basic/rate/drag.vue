<template>
  <el-rate
    v-model="element.config.defaultValue"
    :disabled="readOnly || element.config.disabled"
    :max="element.config.max"
    :show-score="element.config.showScore"
  ></el-rate>
</template>
<script>
export default {
  name: "pgd-rate",
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
