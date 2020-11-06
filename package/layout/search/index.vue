<template>
  <div class="_search">
    <div class="_search-view">
      <el-form
        ref="form"
        label-width="120px"
        label-position="left"
        style="width: 100%"
      >
        <generate-view
          :dragData="element"
          :data.sync="generateData"
          :context="context"
        ></generate-view>
      </el-form>
    </div>
    <div class="_search-button">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button icon="el-icon-circle-close">清空</el-button>
    </div>
  </div>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-search",
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
  }
};
</script>
<style lang="scss">
.generate {
  ._search {
    // min-height: 45px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #ffffff;
    padding: 3px 0;
    margin: 0 10px;
  }
  ._search-view {
    flex: 1;
    // min-height: 45px;
    display: flex;
    flex-direction: row;
  }
  ._search-button {
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-shrink: 0;
    margin: 3px 0 3px 20px;
  }
}
</style>
