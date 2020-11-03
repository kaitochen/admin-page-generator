<template>
  <el-input
    type="textarea"
    v-model="element.config.defaultValue"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    show-word-limit
    :maxlength="element.config.maxLength"
    :minlength="element.config.minLength"
    :rows="5"
  ></el-input>
</template>
<script>
export default {
  name: "pgd-textarea",
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
