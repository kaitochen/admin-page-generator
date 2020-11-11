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
        console.log(this.element.config.btnStyle);
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
    validFn(valid) {
      console.log(valid);
    },
    clickBtn() {
      const { valid, url } = this.element.config;
      if (!url) {
        this.$message.error("该按钮无点击触发，请设置！");
        return;
      }
      try {
        this.validFn(valid);
        const { type, data } = protocolConverter(
          protocolMatchData(url, this.data, this.context)
        );
        if (type === "action") {
          const { action = "" } = data;
          switch (action) {
            case "back":
              console.log(this);
              break;
            case "clear":
              break;
            default:
              break;
          }
        } else if (type === "request" || type === "http") {
          executeProtocol
            .call(this, { type, data })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (type === "route") {
          console.log("route");
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
