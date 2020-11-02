<template>
  <el-form ref="form" label-width="120px">
    <div class="action">
      <el-button icon="el-icon-back" @click="forgive">返回</el-button>
      <el-button
        icon="el-icon-circle-check"
        v-if="element.config.btn.indexOf('save') > -1"
        >保存</el-button
      >
      <el-button
        icon="el-icon-upload2"
        v-if="element.config.btn.indexOf('submit') > -1"
        >提交</el-button
      >
      <el-button
        icon="el-icon-edit"
        v-if="element.config.btn.indexOf('edit') > -1"
        >编辑</el-button
      >
      <el-button
        icon="el-icon-delete"
        v-if="element.config.btn.indexOf('clear') > -1"
        >清空</el-button
      >
    </div>
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
