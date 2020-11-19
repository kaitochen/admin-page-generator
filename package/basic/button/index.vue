<template>
  <el-button
    :type="btnType"
    class="pg-button"
    :icon="element.config.icon"
    :round="element.config.label && element.config.isCircle"
    :plain="element.config.plain"
    :style="btnStyle"
    @click="clickBtn"
    >{{ element.config.label }}</el-button
  >
</template>
<script>
import comp from "../../../mixins/comp";
import {
  protocolConverter,
  protocolMatchData,
  executeProtocol
} from "../../../util/converter.js";
export default {
  name: "pg-button",
  mixins: [comp],
  props: {
    scope: {
      type: Object,
      default: () => {}
    }
  },
  inject: {
    validate: {
      default: () => {
        return Promise.resolve(true);
      }
    },
    insertDialog: {
      default: () => {
        return false;
      }
    },
    closeDialog: {
      default: () => {
        return false;
      }
    },
    dialogKey: {
      default: ""
    },
    refresh: {
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {
      generateData: this.data
    };
  },
  watch: {
    data(val) {
      this.generateData = val;
    },
    generateData: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      }
    }
  },
  computed: {
    btnType() {
      if (this.element.config.btnType === "text") {
        return "text";
      } else {
        return this.element.config.btnStyle === "ghost"
          ? ""
          : this.element.config.btnStyle;
      }
    },
    btnStyle() {
      if (this.element.config.btnType === "button") {
        return {};
      } else {
        let style = {};
        // console.log(this.element.config.btnStyle);
        switch (this.element.config.btnStyle) {
          case "ghost":
            style = { color: "#333" };
            break;
          case "primary":
            style = { color: "#3377FF" };
            break;
          case "success":
            style = { color: "#67C23A" };
            break;
          case "info":
            style = { color: "#909399" };
            break;
          case "warning":
            style = { color: "#E6A23C" };
            break;
          case "danger":
            style = { color: "#F56C6C" };
            break;
        }
        return style;
      }
    }
  },
  methods: {
    clickBtn() {
      const { valid, url } = this.element.config;
      if (!url) {
        this.$message.error("该按钮无点击触发，请设置！");
        return;
      }
      if (valid) {
        this.validate().then(_valid => {
          if (_valid) {
            this.dealProtocol(url);
          }
        });
      } else {
        this.dealProtocol(url);
      }
    },
    dealProtocol(url) {
      try {
        let source;
        if (this.scope && this.scope.row) {
          source = [this.scope.row, this.data];
        } else {
          source = this.data;
        }
        const { type, data } = protocolConverter(
          protocolMatchData(url, source, this.context)
        );
        // console.log(type, data);
        if (type === "action") {
          // console.log("action");
          const { action = "" } = data;
          switch (action) {
            case "back":
              this.$router.go(-1);
              break;
            case "clear":
              if (this.context && this.generateData[this.context]) {
                const _data = this.generateData[this.context];
                for (let k in _data) {
                  _data[k] = "";
                }
                this.generateData[this.context] = _data;
              } else {
                const _data = this.generateData;
                for (let k in _data) {
                  _data[k] = "";
                }
                this.generateData = _data;
              }
              break;
            default:
              break;
          }
        } else if (type === "request" || type === "http") {
          executeProtocol.call(this, { type, data });
        } else if (type === "route") {
          executeProtocol.call(this, { type, data });
        } else {
          console.log("other");
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
