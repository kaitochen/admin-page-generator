<template>
  <el-color-picker
    class="flex-full"
    v-model="element.config.defaultValue"
    :disabled="readOnly || element.config.disabled"
    :show-alpha="element.config.isOpacity"
  ></el-color-picker>
</template>
<script>
export default {
  name: "pgd-color-picker",
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
