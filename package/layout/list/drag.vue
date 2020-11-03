<template>
  <div class="_list-page">
    <drag-view :selectForm.sync="selectWidget" :dragData="element"></drag-view>
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-list",
  components: {
    DragView
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    selectForm: {
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
<style lang="scss" scoped>
._list-page {
  width: 100%;
}
</style>
