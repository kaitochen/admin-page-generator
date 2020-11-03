<template>
  <el-select
    class="flex-full"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="readOnly || element.config.disabled"
    :filterable="element.config.filterable"
    :multiple="element.config.multiple"
    :remote="element.config.remote"
    :remote-method="remoteFn"
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
import { executeProtocol } from "../../../util/converter";
export default {
  name: "pg-select",
  mixins: [comp, multiSelector],
  props: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    remoteFn(query) {
      if (query !== "") {
        this.curlCommand(this.element.config.dynamicUrl, params => {
          params.data.url += "/" + query;
          if (params.type === "request" || params.type === "http") {
            executeProtocol
              .call(this, params)
              .then(res => {
                if (res && res.code === 200) {
                  this.options = res.data;
                } else {
                  this.options = [];
                }
              })
              .catch(err => {
                console.log(err);
                this.options = [];
              });
          }
        });
      } else {
        this.options = [];
      }
    }
  },
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
