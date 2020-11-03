<template>
  <div class="_table-item" :style="{ width: element.config.width + 'px' }">
    <p class="_table-header">{{ element.config.label }}</p>
    <p class="_table-body">
      <drag-view
        :isHorizontal="true"
        :selectForm.sync="selectWidget"
        :dragData="element"
      ></drag-view>
    </p>
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-table-operation",
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
._table-item {
  min-height: 80px;
  min-width: 50px;
  background-color: #fff;
}
p {
  margin: 0;
}
._table-header {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
  line-height: 40px;
  box-sizing: border-box;
  color: #999999;
  font-size: 14px;
  font-weight: bold;
}
._table-body {
  width: 100%;
  min-height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 12px;
  color: #666666;
  overflow: auto;
}
</style>
