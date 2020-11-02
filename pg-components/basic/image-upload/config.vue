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
      <el-form-item label="占位内容">
        <el-input
          type="text"
          v-model="element.config.placeholder"
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
      <el-form-item label="多文件上传">
        <el-radio v-model="element.config.multiple" :label="true">是</el-radio>
        <el-radio v-model="element.config.multiple" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="限制数量">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.limit"
          :min="1"
          :max="50"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="大小数量">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.sizeLimit"
          :min="10"
          :max="100"
        ></el-input-number>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "image-upload-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      patternOption: [
        { value: "ch", label: "中文" },
        { value: "eng", label: "英文" },
        { value: "num", label: "数字" },
        { value: "symbol", label: "字符" }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
