<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="字段标识">
        <el-input type="text" v-model="element.config.prop" size="small" />
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input type="text" v-model="element.config.label" size="small" />
      </el-form-item>
      <el-form-item label="默认值">
        <el-input
          type="text"
          v-model="element.config.defaultValue"
          size="small"
        />
      </el-form-item>
      <el-form-item label="是否必填">
        <el-radio v-model="element.config.required" :label="true">是</el-radio>
        <el-radio v-model="element.config.required" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-radio v-model="element.config.disabled" :label="true">是</el-radio>
        <el-radio v-model="element.config.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否启用透明度">
        <el-radio v-model="element.config.isOpacity" :label="true">是</el-radio>
        <el-radio v-model="element.config.isOpacity" :label="false"
          >否</el-radio
        >
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "color-picker-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss"></style>
