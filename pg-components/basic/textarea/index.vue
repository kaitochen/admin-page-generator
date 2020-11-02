<template>
  <el-input
    type="textarea"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    show-word-limit
    :maxlength="element.config.maxLength"
    :minlength="element.config.minLength"
    :rows="5"
  ></el-input>
</template>
<script>
import comp from "../../../mixins/comp";
export default {
  name: "pg-textarea",
  mixins: [comp],
  props: {}
};
</script>
