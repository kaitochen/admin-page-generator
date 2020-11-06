<template>
  <el-checkbox-group v-model="value">
    <template v-for="checkbox in options">
      <el-checkbox
        :key="checkbox.value"
        :label="checkbox.value"
        :disabled="isReadOnly || element.config.disabled"
        >{{ checkbox.label }}</el-checkbox
      >
    </template>
  </el-checkbox-group>
</template>
<script>
import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";
export default {
  name: "pg-checkbox",
  mixins: [comp, multiSelector],
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {
    this.value = [];
    let dynamic = this.element.config.dynamic;
    if (dynamic) {
      this.options = [];
    } else {
      this.options = this.element.config.options;
    }
  }
};
</script>
