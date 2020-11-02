<template>
  <el-button
    :type="btnType"
    class="pg-button"
    :icon="element.config.icon"
    :round="element.config.label && element.config.isCircle"
    :plain="element.config.plain"
    :style="btnStyle"
    >{{ element.config.label }}</el-button
  >
</template>
<script>
export default {
  name: "pgd-button",
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    element: {
      type: Object,
      required: true
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
  watch: {
    "element.config.btnType": {
      deep: true,
      handler: function(val) {
        console.log(val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.pg-button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
</style>
