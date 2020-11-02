<template>
  <component
    :key="select.key"
    :is="componentName"
    :element="select"
  ></component>
</template>
<script>
import { configComponents } from "./componentsConfig";

export default {
  name: "generate-config-form",
  components: {
    ...configComponents
  },
  props: {
    select: {
      type: Object,
      required: true
    }
  },
  computed: {
    componentName() {
      if (this.select.type && this.select.type !== "col") {
        return this.select.type + "-config";
      } else {
        return "";
      }
    }
  }
};
</script>
