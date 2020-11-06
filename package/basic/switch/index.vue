<template>
  <el-switch
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
    :active-text="element.config.activeText"
    :inactive-text="element.config.inactiveText"
    :active-color="element.config.activeColor"
    :inactive-color="element.config.inactiveColor"
  ></el-switch>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-switch",
  mixins: [comp],
  props: {}
};
</script>
