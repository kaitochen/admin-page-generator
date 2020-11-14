<template>
  <el-form class="_config-pg-form" label-position="top">
    <div class="_config-pg-form-item">
      <p class="_config-pg-title">页面配置</p>
      <el-form-item label="上下文配置">
        <el-input type="text" v-model="element.context" size="small">
        </el-input>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "page-config-form",
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
