<template>
  <div class="_list-page">
    <generate-view :dragData="element"></generate-view>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-list",
  components: {
    GenerateView
  },
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      selectWidget: this.selectForm
    };
  },
  watch: {
    selectForm(val) {
      this.selectWidget = val;
    },
    selectWidget: {
      handler(val) {
        this.$emit("update:selectForm", val);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss">
.generate {
  ._list-page {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
