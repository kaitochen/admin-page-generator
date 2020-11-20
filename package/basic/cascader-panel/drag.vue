<template>
  <el-cascader
    class="flex-full"
    v-model="element.config.defaultValue"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    :filterable="element.config.filterable"
  >
    <el-option
      v-for="item in element.config.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-cascader>
</template>
<script>
export default {
  name: "pgd-cascader-panel",
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
