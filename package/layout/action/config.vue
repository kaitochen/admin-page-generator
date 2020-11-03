<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">属性配置</p>
      <el-form-item label="标题内容">
        <!-- <el-input type="text" v-model="element.config.label" size="small" /> -->
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "action-config",
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
