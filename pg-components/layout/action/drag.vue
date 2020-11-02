<template>
  <div class="_action">
    <drag-view
      :isHorizontal="true"
      :selectForm.sync="selectWidget"
      :dragData="element"
    ></drag-view>
    <!-- <pg-button
      v-for="(btn, index) in element.columns"
      :key="index"
      :element="btn"
      :selectForm="selectForm"
    ></pg-button> -->
    <!-- <el-button class="_action-btn" type="text" icon="el-icon-back"
      >返回</el-button
    >
    <el-button class="_action-btn" type="text" icon="el-icon-upload2"
      >提交</el-button
    >
    <el-button class="_action-btn" type="text" icon="el-icon-close"
      >清除</el-button
    > -->
    <!-- <el-button icon="el-icon-plus" type="text" style="color: #999"
      >添加按钮</el-button
    > -->
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-action",
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
._action {
  width: 100%;
  min-height: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
._action-btn {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 14px;
}
</style>
