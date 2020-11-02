<template>
  <el-switch
    v-model="element.config.defaultValue"
    :disabled="readOnly || element.config.disabled"
    :active-text="element.config.activeText"
    :inactive-text="element.config.inactiveText"
    :active-color="element.config.activeColor"
    :inactive-color="element.config.inactiveColor"
  ></el-switch>
</template>
<script>
export default {
  name: "pgd-switch",
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
