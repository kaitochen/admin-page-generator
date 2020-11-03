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
      <el-form-item label="校验格式">
        <el-select
          v-model="element.config.pattern"
          size="small"
          multiple
          style="width: 100%"
        >
          <el-option
            v-for="item in patternOption"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否禁用">
        <el-radio v-model="element.config.disabled" :label="true">是</el-radio>
        <el-radio v-model="element.config.disabled" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="最大长度">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.maxLength"
          :min="1"
          :max="500"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="最小长度">
        <el-input-number
          size="small"
          style="width: 100%"
          v-model="element.config.minLength"
          :min="1"
          :max="500"
        ></el-input-number>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "textarea-config",
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
