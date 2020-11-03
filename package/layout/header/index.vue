<template>
  <div class="pg-header">
    <p>{{ element.config.label }}</p>
  </div>
</template>
<script>
export default {
  name: "pg-header",
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
<style lang="scss"></style>
