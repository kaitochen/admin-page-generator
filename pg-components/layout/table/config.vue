<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="字段标识">
        <el-input v-model="element.config.prop"></el-input>
      </el-form-item>
      <el-form-item label="是否可以多选">
        <el-radio-group v-model="element.config.selection">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否显示分页器">
        <el-radio-group v-model="element.config.pagination">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="表格高度(不填则不限制)">
        <el-input v-model="element.config.height"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "table-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss"></style>
