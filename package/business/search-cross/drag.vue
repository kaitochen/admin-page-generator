<template>
  <div class="_search">
    <div class="_search-view">
      <drag-view
        :selectForm.sync="selectWidget"
        :dragData="element"
      ></drag-view>
    </div>
    <div class="_search-button">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button icon="el-icon-circle-close">清空</el-button>
    </div>
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-search-cross",
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
._search {
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
._search-view {
  flex: 1;
  min-height: 50px;
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border: 1px dashed #e5e5e5;
}
._search-button {
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-shrink: 0;
  margin-left: 20px;
}
</style>
