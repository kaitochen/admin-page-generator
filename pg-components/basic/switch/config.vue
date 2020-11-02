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
        <el-radio v-model="element.config.defaultValue" :label="true"
          >true</el-radio
        >
        <el-radio v-model="element.config.defaultValue" :label="false"
          >false</el-radio
        >
      </el-form-item>

      <el-form-item label="是否必填">
        <el-radio v-model="element.config.required" :label="true">是</el-radio>
        <el-radio v-model="element.config.required" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-radio v-model="element.config.disabled" :label="true">是</el-radio>
        <el-radio v-model="element.config.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="启用时内容">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.activeText"
        ></el-input>
      </el-form-item>
      <el-form-item label="关闭时内容">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.inactiveText"
        ></el-input>
      </el-form-item>
      <el-form-item label="启用时颜色">
        <el-color-picker
          v-model="element.config.activeColor"
          size="small"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="关闭时颜色">
        <el-color-picker
          v-model="element.config.inactiveColor"
          size="small"
        ></el-color-picker>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "switch-config",
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
