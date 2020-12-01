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
      <el-form-item label="是否可搜索">
        <el-radio v-model="element.config.filterable" :label="true"
          >是</el-radio
        >
        <el-radio v-model="element.config.filterable" :label="false"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="是否多选">
        <el-radio v-model="element.config.multiple" :label="true">是</el-radio>
        <el-radio v-model="element.config.multiple" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item label="是否显示完整路径">
        <el-radio v-model="element.config.showAllLevels" :label="true"
          >是</el-radio
        >
        <el-radio v-model="element.config.showAllLevels" :label="false"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="是否任选一级">
        <el-radio v-model="element.config.checkStrictly" :label="true"
          >是</el-radio
        >
        <el-radio v-model="element.config.checkStrictly" :label="false"
          >否</el-radio
        >
      </el-form-item>
      <el-form-item label="级联层数">
        <el-input-number
          class="flex-full"
          v-model="element.config.level"
          :min="1"
          :max="5"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="动态配置属性">
        <el-input
          type="textarea"
          class="_dynamic-option"
          v-model="element.config.dynamicUrl"
          placeholder="请输入请求地址"
        >
        </el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "cascader-panel-config",
  props: {
    element: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss">
._dynamic-option {
  .el-input-group__prepend {
    width: 40px;
    text-align: center;
    padding: 0;
  }
}
._options {
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  ._options-add {
    width: 24px;
    height: 24px;
    background-color: cornflowerblue;
    opacity: 0.8;
    border-radius: 12px;
    flex-shrink: 0;
    margin: 0 3px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
  ._options-delete {
    width: 24px;
    height: 24px;
    background-color: #ff4e56;
    opacity: 0.8;
    border-radius: 12px;
    flex-shrink: 0;
    margin: 0 3px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
    color: #fff;
  }
}
</style>
