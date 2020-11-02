<template>
  <el-row :gutter="10">
    <el-col
      v-for="(dragData, index) in element.columns"
      :key="dragData.key"
      :span="24 / element.columns.length"
    >
      <div
        class="col"
        :key="dragData.key"
        @click.stop="_selectWidget(index)"
        :class="{ 'widget-active': selectWidget.key === dragData.key }"
      >
        <drag-view
          :selectForm.sync="selectWidget"
          :dragData="dragData"
        ></drag-view>
        <div class="widget-view-action">
          <span
            v-show="
              selectWidget.key === dragData.key &&
                index + 1 === element.columns.length
            "
            class="widget-view-add el-icon-document-copy"
            @click.stop="_addWidget"
          ></span>
          <span
            v-show="
              selectWidget.key === dragData.key && element.columns.length !== 1
            "
            class="widget-view-delete el-icon-delete"
            @click.stop="_deleteWidget(index)"
          ></span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import DragView from "../../../components/DragView";
export default {
  name: "pgd-grid",
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
    _selectWidget(index) {
      // this.$emit("update:selectForm", this.dragData.columns[index]);
      this.selectWidget = this.element.columns[index];
    },
    _addWidget() {
      const index = this.element.columns.length;
      const key = this.generateKey("col");
      this.$set(this.element.columns, index, {
        type: "col",
        columns: [],
        key
      });
    },
    _deleteWidget(index) {
      this.element.columns.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.col {
  background-color: #f8f8f8;
  border: 1px dashed #e5e5e5;
  min-height: 45px;
  padding: 5px;
  position: relative;
}
</style>
