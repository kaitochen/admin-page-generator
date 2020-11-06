<template>
  <el-input
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="isReadOnly || element.config.disabled"
    clearable
    :maxlength="element.config.maxLength"
    :minlength="element.config.minLength"
  ></el-input>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-input",
  mixins: [comp],
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {}
};
</script>
