<template>
  <el-cascader
    class="flex-full"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    :filterable="element.config.filterable"
    :show-all-levels="element.config.showAllLevels"
    :props="configOptions"
    :options="options"
  >
  </el-cascader>
</template>
<script>
import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";
export default {
  name: "pg-cascader",
  mixins: [comp, multiSelector],
  props: {},
  computed: {
    configOptions() {
      return {
        multiple: this.element.config.multiple,
        checkStrictly: this.element.config.checkStrictly,
        lazy: this.element.config.lazy,
        lazyLoad(node, resolve) {
          console.log(node);
          resolve([]);
        }
      };
    }
  }
};
</script>
