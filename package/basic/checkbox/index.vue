<template>
  <el-checkbox-group
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
  >
    <template v-for="checkbox in options">
      <el-checkbox :key="checkbox.value" :label="checkbox.value">{{
        checkbox.label
      }}</el-checkbox>
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
    if (!dynamic) {
      this.options = [...this.element.config.options];
    }
  }
};
</script>
