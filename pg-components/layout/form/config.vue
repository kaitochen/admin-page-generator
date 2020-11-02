<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="是否可编辑">
        <el-radio-group v-model="element.config.editable">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="按钮类型">
        <el-checkbox-group v-model="element.config.btn">
          <el-checkbox
            v-for="option in element.config.btnOption"
            :label="option.value"
            :key="option.value"
            >{{ option.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="数据获取地址">
        <el-input
          type="text"
          v-model="element.config.paddingUrl"
          size="small"
        />
      </el-form-item>

      <el-form-item label="数据提交地址">
        <el-input type="text" v-model="element.config.submitUrl" size="small" />
      </el-form-item>
      <el-form-item label="编辑跳转地址">
        <el-input type="text" v-model="element.config.editUrl" size="small" />
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "form-config",
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
