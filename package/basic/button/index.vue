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
export default {
  name: "pg-button",
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
    clickBtn() {
      console.log(this.element.config.url);
    }
  }
};
</script>
<style lang="scss" scoped></style>
