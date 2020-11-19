<template>
  <el-cascader
    class="flex-full"
    v-model="value"
    :placeholder="element.config.placeholder"
    :disabled="isReadOnly || element.config.disabled"
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
              params.data.url += _this.getNodeValue(node);
              if (params.type === "request" || params.type === "http") {
                executeProtocol.call(_this, {
                  ...params,
                  cb: res => {
                    if (res && res.code === 200) {
                      resolve(
                        res.data.map(item => ({
                          value: item.key,
                          label: item.value
                        }))
                      );
                    } else {
                      resolve([]);
                    }
                  }
                });
              }
            });
          } catch (e) {
            console.log("error", e);
          }
        }
      };
    }
  },
  methods: {
    getNodeValue(node) {
      if (node.parent) {
        return this.getNodeValue(node.parent) + "/" + node.value;
      } else {
        return "/" + node.value;
      }
    }
  },
  mounted() {
    const _this = this;
    try {
      _this.curlCommand(_this.element.config.dynamicUrl, params => {
        if (params.type === "request" || params.type === "http") {
          executeProtocol.call(_this, {
            ...params,
            cb: res => {
              if (res && res.code === 200) {
                console.log("cascade", res);
                this.options = res.data.map(item => ({
                  value: item.key,
                  label: item.value
                }));
              } else {
                this.options = [];
              }
            }
          });
        }
      });
    } catch (e) {
      console.log("error", e);
    }
  }
};
</script>
