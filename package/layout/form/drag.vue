<template>
  <el-form ref="form" label-width="120px">
    <drag-view :selectForm.sync="selectWidget" :dragData="element"></drag-view>
  </el-form>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-form",
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
  },
  methods: {
    _selectWidget() {
      // this.$emit("update:selectForm", this.dragData.columns[index]);
      this.selectWidget = this.element;
    },
    forgive() {
      this.$emit("forgive");
    }
  }
};
</script>
<style lang="scss" scoped>
.action {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
