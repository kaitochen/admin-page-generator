<template>
  <div class="_header">
    <p>{{ element.config.label }}</p>
  </div>
</template>
<script>
export default {
  name: "pgd-header",
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
