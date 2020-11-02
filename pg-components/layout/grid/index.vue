<template>
  <el-row :gutter="10">
    <el-col
      v-for="dragData in element.columns"
      :key="dragData.key"
      :span="24 / element.columns.length"
    >
      <div class="col" :key="dragData.key">
        <generate-view
          :data.sync="generateData"
          :dragData="dragData"
          :context="context"
        ></generate-view>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-grid",
  components: {
    GenerateView
  },
  props: {
    element: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    context: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      generateData: this.data
    };
  },
  watch: {
    data(val) {
      this.generateData = val;
    },
    generateData: {
      deep: true,
      handler(val) {
        this.$emit("update:data", val);
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.col {
  min-height: 45px;
  position: relative;
}
</style>
