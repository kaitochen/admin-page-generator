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
import { executeProtocol } from "../../../util/converter";
import comp from "../../../mixins/comp";
import multiSelector from "../../../mixins/multiSelector";
export default {
  name: "pg-cascader",
  mixins: [comp, multiSelector],
  props: {},
  computed: {
    configOptions() {
      const _this = this;
      return {
        multiple: _this.element.config.multiple,
        checkStrictly: _this.element.config.checkStrictly,
        lazy: _this.element.config.lazy,
        lazyLoad(node, resolve) {
          let { value } = node;
          if (value === null || value === undefined) {
            return;
          }
          try {
            _this.curlCommand(_this.element.config.dynamicUrl, params => {
              params.data.url += "/" + value;
              if (params.type === "request" || params.type === "http") {
                executeProtocol
                  .call(_this, params)
                  .then(res => {
                    if (res && res.code === 200) {
                      resolve(res.data);
                    } else {
                      resolve([]);
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    resolve([]);
                  });
              }
            });
          } catch (e) {
            console.log("error", e);
          }
        }
      };
    }
  }
};
</script>
