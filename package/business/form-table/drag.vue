<template>
  <div>
    <div class="_table">
      <drag-view
        :isHorizontal="true"
        :selectForm.sync="selectWidget"
        :dragData="element"
      ></drag-view>
    </div>
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-form-table",
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
      selectWidget: this.selectForm,
      data: []
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
._table {
  width: 100%;
  min-height: 80px;
  overflow: auto;
}
</style>
