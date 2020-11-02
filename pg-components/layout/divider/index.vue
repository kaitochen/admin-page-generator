<template>
  <el-divider :content-position="element.config.position">{{
    element.config.label
  }}</el-divider>
</template>
<script>
export default {
  name: "pg-divider",
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
<style lang="scss" scoped></style>
