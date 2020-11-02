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
        <el-input-number
          class="flex-full"
          type="text"
          v-model="element.config.defaultValue"
          size="small"
          :step="element.config.allowHalf ? 0.5 : 1"
          :min="0"
          :max="element.config.max"
        />
      </el-form-item>
      <el-form-item label="最大分值">
        <el-input-number
          class="flex-full"
          type="text"
          v-model="element.config.max"
          size="small"
          :step="element.config.allowHalf ? 0.5 : 1"
          :min="3"
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
      <el-form-item label="是否半选">
        <el-radio v-model="element.config.allowHalf" :label="true">是</el-radio>
        <el-radio v-model="element.config.allowHalf" :label="false"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="是否展示分数">
        <el-radio v-model="element.config.showScore" :label="true">是</el-radio>
        <el-radio v-model="element.config.showScore" :label="false"
          >否</el-radio
        >
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "rate-config",
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
