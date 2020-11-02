<template>
  <span>
    <template v-for="radio in options">
      <el-radio
        :key="radio.value"
        v-model="value"
        :label="radio.value"
        :disabled="readOnly || element.config.disabled"
        >{{ radio.label }}</el-radio
      >
    </template>
  </span>
</template>
<script>
import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";
export default {
  name: "pg-radio",
  mixins: [comp, multiSelector],
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {
    let dynamic = this.element.config.dynamic;
    if (dynamic) {
      this.options = [];
    } else {
      this.options = this.element.config.options;
    }
  }
};
</script>
