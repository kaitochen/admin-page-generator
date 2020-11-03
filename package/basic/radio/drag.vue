<template>
  <span>
    <template v-for="radio in element.config.options">
      <el-radio
        :key="radio.value"
        v-model="element.config.defaultValue"
        :label="radio.value"
        :disabled="readOnly || element.config.disabled"
        >{{ radio.label }}</el-radio
      >
    </template>
  </span>
</template>
<script>
export default {
  name: "pgd-radio",
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
