<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="数据查询地址">
        <el-input type="text" v-model="element.config.searchUrl" size="small" />
      </el-form-item>
      <el-form-item label="是否分页">
        <el-radio-group v-model="element.config.pagination">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="按钮类型"> </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "list-config",
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
