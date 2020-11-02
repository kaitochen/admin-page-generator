<template>
  <div>
    <div class="_table">
      <drag-view
        :isHorizontal="true"
        :selectForm.sync="selectWidget"
        :dragData="element"
      ></drag-view>
    </div>
    <el-pagination
      v-if="element.config.pagination"
      style="margin-top: 10px;text-align:center"
      background
      :page-sizes="[10, 20, 50, 100]"
      :total="500"
      :page-size="10"
      :current-page="1"
      layout="sizes,prev, pager, next,jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-table",
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
