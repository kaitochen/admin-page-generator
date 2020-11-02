<template>
  <el-color-picker
    class="flex-full"
    v-model="value"
    :disabled="readOnly || element.config.disabled"
    :show-alpha="element.config.isOpacity"
  ></el-color-picker>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-color-picker",
  mixins: [comp],
  props: {}
};
</script>
