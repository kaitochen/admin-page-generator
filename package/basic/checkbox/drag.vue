<template>
  <el-checkbox-group v-model="element.config.defaultValue">
    <template v-for="checkbox in element.config.options">
      <el-checkbox
        :key="checkbox.value"
        v-model="element.config.defaultValue"
        :label="checkbox.value"
        :disabled="readOnly || element.config.disabled"
        >{{ checkbox.label }}</el-checkbox
      >
    </template>
  </el-checkbox-group>
</template>
<script>
export default {
  name: "pgd-checkbox",
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
