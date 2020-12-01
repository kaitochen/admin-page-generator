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
      <el-form-item label="宽度">
        <el-input
          size="small"
          style="width: 100%"
          v-model="element.config.width"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="是否固定在右侧">
        <el-radio-group v-model="element.config.fixRight">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </div>
  </el-form>
</template>
<script>
export default {
  name: "table-operation-config",
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
