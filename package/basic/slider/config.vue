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
      <el-form-item label="是否必填">
        <el-radio v-model="element.config.required" :label="true">是</el-radio>
        <el-radio v-model="element.config.required" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-radio v-model="element.config.disabled" :label="true">是</el-radio>
        <el-radio v-model="element.config.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.max"
          :min="-500"
          :max="500"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最小值">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.min"
          :min="-500"
          :max="500"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="是否为范围选择">
        <el-radio-group v-model="element.config.multiple">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="步长">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.step"
          :min="0"
        ></el-input-number>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "slider-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss"></style>
