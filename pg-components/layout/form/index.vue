<template>
  <el-form
    ref="form"
    label-width="150px"
    :model="generateData.form"
    label-position="left"
    class="pg-form"
  >
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
    <generate-view
      :context="context"
      :data.sync="generateData"
      :dragData="element"
    ></generate-view>
  </el-form>
</template>
<script>
import GenerateView from "../../../components/GenerateView";
export default {
  name: "pg-form",
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
    }
  },
  data() {
    return {
      generateData: this.data,
      context: "form"
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

  methods: {
    forgive() {
      this.$emit("forgive");
    }
  }
};
</script>
<style lang="scss" scoped></style>
