<template>
  <el-select
    class="flex-full"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    :filterable="element.config.filterable"
    :multiple="element.config.multiple"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";

export default {
  name: "pg-select",
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
