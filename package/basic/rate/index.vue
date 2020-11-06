<template>
  <el-rate
    v-model="value"
    :disabled="isReadOnly || element.config.disabled"
    :max="element.config.max"
    :show-score="element.config.showScore"
    :allow-half="element.config.allowHalf"
  ></el-rate>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-rate",
  mixins: [comp],
  props: {}
};
</script>
